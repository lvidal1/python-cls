/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { modelMapper, ModelTypes, } from '@challenge/models'
import axios, { AxiosError, AxiosInstance, AxiosResponse, } from 'axios'

import { setAuth, } from '@/helpers/auth'

import Config from '../config'

const REFRESH_TOKEN = '/refresh/'

export interface APIRequestArgs {
  url: string,
  payload?: unknown,
  params?: unknown,
  responseType?: keyof typeof ModelTypes,
}

class ApiService {
  axios: AxiosInstance

  authToken: JWTTokens | undefined

  refreshing: boolean

  constructor() {
    this.refreshing = false

    const { apiURL, showsAPIBodies, } = Config
    const data: {
      headers: {
        Accept: string,
        Authorization?: string,
        'Content-Type': 'application/json',
      },
      baseURL: string,
    } = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: apiURL || '',
    }

    this.axios = axios.create(data)

    let start: number
    // @ts-ignore
    this.axios.interceptors.request.use((configuration) => {
      start = Date.now()
      if (showsAPIBodies) {
        const method = configuration?.method || ''
        console.groupCollapsed(
          `%c API Request => ${method.toUpperCase()} ${configuration.url}`,
          `color: lightslategrey`
        )
        console.log('timestamp', new Date(Date.now()).toString())
        console.log('configuration', configuration)
        console.groupEnd()
      }
      return configuration
    })

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (showsAPIBodies) {
          const method = response?.config?.method || ''
          console.groupCollapsed(
            `%c API Response => ${method.toUpperCase()} ${response?.config.url}`,
            `color: forestgreen`
          )
          console.log('timestamp', new Date(Date.now()).toString())
          console.log('duration', `${Date.now() - start}ms`)
          console.log('response', response)
          console.groupEnd()
        }
        // @ts-ignore
        const { apiResponseType, } = response.config
        if (apiResponseType) {
          response.data = modelMapper(apiResponseType, response.data.data)
        }
        return response
      },
      async (error: AxiosError) => {
        const method = error.response?.config?.method || ''
        if (!this.refreshing && (error.response?.status === 401 || error.response?.status === 403)) {
          // Try to refresh the token and make the request again
          console.log(
            `%c API Refreshing => ${method.toUpperCase()} ${error.response?.config.url || ''}`,
            `color: gold`
          )
          try {
            this.refreshing = true
            const refreshResponse = await this.axios.post(REFRESH_TOKEN, { refresh: this.authToken?.refresh, })
            const tokens = refreshResponse.data
            this.authToken = tokens
            setAuth(tokens)
            this.setAuthHeader(tokens)
            const response = await this.axios.request(error.config)
            this.refreshing = false
            return Promise.resolve(response)
          } catch (e) {
            this.refreshing = false
          }
        }
        console.groupCollapsed(
          `%c API Error => ${method.toUpperCase()} ${error.response?.config.url || ''}`,
          `color: firebrick`
        )
        console.log('timestamp', new Date(Date.now()).toString())
        console.log('duration', `${Date.now() - start}ms`)
        console.log('error', { error, })
        console.groupEnd()
        return Promise.reject(error)
      }
    )
  }

  setAuthHeader = (authToken: JWTTokens) => {
    this.authToken = authToken
    if (authToken && authToken.access && authToken.access?.length > 0) {
      this.axios.defaults.headers.Authorization = `Bearer ${authToken.access}`
    }
  }

  get = ({
    url, payload, responseType,
    // @ts-ignore
  }: APIRequestArgs) => this.axios.get<any>(url, { apiResponseType: responseType, params: payload, })

  // @ts-ignore
  post = ({ url, payload, responseType, }: APIRequestArgs) => this.axios.post<any>(url, payload, { apiResponseType: responseType, })

  // @ts-ignore
  put = ({ url, payload, responseType, }: APIRequestArgs) => this.axios.put<any>(url, payload, { apiResponseType: responseType, })

  // @ts-ignore
  patch = ({ url, payload, responseType, }: APIRequestArgs) => this.axios.patch<any>(url, payload, { apiResponseType: responseType, })

  // @ts-ignore
  delete = ({ url, payload, responseType, }: APIRequestArgs) => this.axios.delete(url, payload, { apiResponseType: responseType, })
}

export default new ApiService()
