import { ModelTypes, } from '@challenge/models'

import type { APIRequestArgs, } from '../ApiService'
import ApiService from '../ApiService'
// import Mixpanel from './mixpanel'

const LOGIN_USER_URL = '/accounts/login/'
const SIGNUP_URL = '/accounts/signup/'
const ME_URL = '/accounts/me/'
const LOGOUT_USER_URL = 'accounts/logout/'

const axiosAdaptor = async (fn: (args: APIRequestArgs) => Promise<any>, args: any) => {
  console.log(fn)
  let resp
  let err
  try {
    const response = await fn(args)
    resp = { statusCode: response.status, data: response.data, }
  } catch (e) {
    err = { statusCode: e.response.status, details: e.response.data.error, }
  }
  return [resp, err,]
}

const Api = {
  get: (arg: APIRequestArgs) => axiosAdaptor(ApiService.get, arg),
  post: (arg: APIRequestArgs) => axiosAdaptor(ApiService.post, arg),
  put: (arg: APIRequestArgs) => axiosAdaptor(ApiService.put, arg),
  patch: (arg: APIRequestArgs) => axiosAdaptor(ApiService.patch, arg),
  delete: (arg: APIRequestArgs) => axiosAdaptor(ApiService.delete, arg),

}

/**
  * @param {api} ApiService
  * @return Object passed to the api saga, each value must be an asyn function that returns Array<ResponeType, ErrorType>
  * supported by the radio-disptach api-saga
 */
const ApiServices = () => {
  // General pagination endpoint
  const getNextPage = (url: string, responseType: keyof typeof ModelTypes) => Api.get({ url, responseType, })
  // @ts-ignore
  const login = (data: { username: string, password: string }) => Api.post({ url: LOGIN_USER_URL, payload: data, responseType: ModelTypes.User, })

  const signup = (data: { username: string, password: string }) => Api.post({ url: SIGNUP_URL, payload: data, responseType: ModelTypes.User, })
  // @ts-ignore
  const me = () => Api.get({ url: ME_URL, responseType: ModelTypes.User, })
  // @ts-ignore
  const updateMe = (data: any) => Api.post({ url: ME_URL, payload: data, responseType: ModelTypes.User, })

  const logoutUser = () => Api.post({ url: LOGOUT_USER_URL, payload: { refresh: ApiService?.authToken?.refresh, }, })

  return {
    getNextPage,
    login,
    signup,
    me,
    updateMe,
    logoutUser,
  }
}

const services = ApiServices()

export default services
