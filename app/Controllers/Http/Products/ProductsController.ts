import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import fn from 'App/Services/Functions'

export default class ProductsController {
  public async get({ request, response }: HttpContextContract) {
    const { prop, value } = request.qs()

    const products = await Product.all()

    if (prop && value) {
      if (!Product.includeProperty({ property: prop })) {
        return response.badRequest({
          status: 'Error',
          message: 'La propiedad no existe',
          data: {
            prop: prop ?? null,
            value: value ?? null,
            avaible_props: Product.avaibleProperties()
          }
        })
      }

      const product = Product.finder({
        data: products,
        property: prop,
        value
      })

      if (!product) {
        return response.notFound({
          status: 'Error',
          message: 'Producto no encontrado',
          data: null
        })
      }

      return response.ok({
        status: 'Success',
        message: 'Producto encontrado',
        data: product
      })
    }

    return response.ok({
      status: 'Success',
      message: 'Productos obtenidos',
      data: products
    })
  }

  public async update({ response }: HttpContextContract) {
    // Obtener el catálogo de la API
    const { status, data } = await fn.axiosSendRequest({
      endpoint: 'productos',
      method: 'GET',
      data: null,
      query: null
    })

    // Validar que la respuesta de la API sea correcta
    if (status != 200) {
      return response.status(status).json({
        status: 'Error',
        message: 'Error al obtener los productos de la API',
        data: data
      })
    }

    // Obtener los productos de la API
    const { datos } = data

    // Inicializa los contadores
    let new_products = 0
    let updated_products = 0
    let not_in_api: any[] = []

    // Obtener el catálogo de la tabla de XNPV_productos_proveedores
    const products = await Product.all()

    // Crear un mapa con los productos de la API
    const apiProductsMap = datos.reduce((map, product) => {
      map[product.referencia] = product
      return map
    }, {})

    // Recorrer los productos de la tabla XNPV_productos_proveedores
    for (const product of products) {
      const apiProduct = apiProductsMap[product.xnprp_referencia!]

      // Si el producto no existe en la API
      if (!apiProduct) {
        // Mandar su inventario a 0
        await product.merge({ xnprp_existencia: 0 }).save()
        not_in_api.push(product)
      } else {
        // Actualizar el producto en la tabla XNPV_productos_proveedores
        await product.merge({
          xnprp_categoria: apiProduct.categoria_nombre,
          xnprp_marca: apiProduct.marca_nombre,
          xnprp_nombre: apiProduct.nombre,
          xnprp_existencia: parseInt(apiProduct.stock),
          xnprp_costo: parseFloat(apiProduct.precio)
        }).save()

        // Incrementar el contador de productos actualizados
        updated_products++
      }

      // Eliminar el producto del mapa
      delete apiProductsMap[product.xnprp_referencia!]
    }

    // Recorrer los productos restantes en el mapa (los que no existen en la tabla XNPV_productos_proveedores)
    for (const referencia in apiProductsMap) {
      const apiProduct = apiProductsMap[referencia]

      // Crear el producto en la tabla XNPV_productos_proveedores
      await Product.create({
        xnprp_categoria: apiProduct.categoria_nombre,
        xnprp_marca: apiProduct.marca_nombre,
        xnprp_referencia: referencia,
        xnprp_nombre: apiProduct.nombre,
        xnprp_existencia: parseInt(apiProduct.stock),
        xnprp_costo: parseFloat(apiProduct.precio)
      })

      // Incrementar el contador de nuevos productos
      new_products++
    }

    return response.ok({
      status: 'Success',
      message: 'Productos actualizados',
      data: {
        new_products,
        updated_products,
        not_in_api
      }
    })
  }
}
