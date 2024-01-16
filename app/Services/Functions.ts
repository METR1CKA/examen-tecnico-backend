import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'
import axios from 'axios'
import https from 'https'

class Functions {
  private localZone = 'America/Mexico_City'

  public serializeDates({ format }: { format: string }) {
    return {
      serialize: (value: DateTime | null) => value?.setZone(this.localZone)?.toFormat(format) ?? value
    }
  }

  public async axiosSendRequest({ endpoint, method, data, query }: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data: any;
    query: any
  }) {
    const clientHttp = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    try {
      const options: any = {
        method,
        url: `${Env.get('API_URL')}/${endpoint}`,
        headers: {
          Authorization: Env.get('API_KEY'),
        }
      }

      if (query) options.params = query

      if (data) options.data = data

      var res = await clientHttp(options)
    } catch (error) {
      if (Env.get('NODE_ENV') == 'development') {
        console.error('REQUEST_ERROR:', error?.response)
      }

      return {
        status: error?.response?.status ?? 400,
        data: error?.response?.data ?? null
      }
    }

    const { status } = res

    return {
      status,
      data: res.data
    }
  }
}

export default new Functions()