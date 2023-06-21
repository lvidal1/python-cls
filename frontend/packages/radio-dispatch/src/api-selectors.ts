import { ApiMeta, ErrorType, RequestManagementStore } from './types'
import { getErrorKey, getMetaKey, getPendingKey } from './utils'

function getError<S>(store: { api: RequestManagementStore }, serviceKey: keyof S): ErrorType | null {
  const errorKey = getErrorKey(serviceKey)
  if (typeof store.api[errorKey] === 'object') {
    return store.api[errorKey] as ErrorType
  }
  return null
}

function getPending<S>(store: { api: RequestManagementStore }, serviceKey: keyof S): boolean {
  const pendingKey = getPendingKey(serviceKey)
  if (typeof store.api[pendingKey] === 'boolean') {
    return store.api[pendingKey] as boolean
  }
  return false
}

function getMeta<S>(store: { api: RequestManagementStore }, serviceKey: keyof S): ApiMeta | null {
  const metaKey = getMetaKey(serviceKey)
  if (typeof store.api[metaKey] === 'object') {
    return store.api[metaKey] as ApiMeta
  }
  return null
}

export default {
  getError,
  getPending,
  getMeta,
}
