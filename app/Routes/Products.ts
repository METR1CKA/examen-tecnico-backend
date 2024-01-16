import Route from '@ioc:Adonis/Core/Route'

// Products
Route.group(() => {
  Route.group(() => {
    Route.get('', 'ProductsController.get')
    Route.put('', 'ProductsController.update')
  })
    .middleware('auth')
})
  .namespace('App/Controllers/Http/Products')
  .prefix('api/v1/products')
