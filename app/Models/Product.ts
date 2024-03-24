import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import fn from 'App/Services/Functions'
import { DateTime } from 'luxon'

export default class Product extends BaseModel {
  public static table = 'XNPV_productos_proveedores'
  private static readonly key_props = ['xnprp_id', 'xnprp_referencia', 'xnprp_sku']

  @column({
    isPrimary: true
  })
  public xnprp_id: number

  @column()
  public xnprp_categoria?: string | null

  @column()
  public xnprp_marca?: string | null

  @column()
  public xnprp_referencia?: string | null

  @column()
  public xnprp_nombre?: string | null

  @column()
  public xnprp_sku?: string | null

  @column()
  public xnprp_existencia: number

  @column()
  public xnprp_costo?: number | null

  @column()
  public xnprp_oferta?: number | null

  @column()
  public xnprp_costo_real?: number | null

  @column.dateTime({
    ...fn.serializeDates({ format: 'yyyy-MM-dd' })
  })
  public xnprp_oferta_inicio?: DateTime | null

  @column.dateTime({
    ...fn.serializeDates({ format: 'yyyy-MM-dd' })
  })
  public xnprp_oferta_fin?: DateTime | null

  @column()
  public usuario_creacion?: string | null

  @column()
  public usuario_modificacion?: string | null

  @column.dateTime({
    autoCreate: true,
    ...fn.serializeDates({ format: 'yyyy-MM-dd HH:mm:ss' })
  })
  public fecha_creacion?: DateTime | null

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    ...fn.serializeDates({ format: 'yyyy-MM-dd HH:mm:ss' })
  })
  public fecha_modificacion?: DateTime | null

  public static includeProperty({ property }: { property: string }) {
    return this.key_props.includes(property)
  }

  public static avaibleProperties() {
    return this.key_props
  }

  public static async finder({ data, property, value }: { data: any[]; property: string; value: number }) {
    const data_indexed = data.reduce((acc: any, item: any) => {
      acc[item[property]] = item
      return acc
    }, {})

    return data_indexed[value]
  }
}
