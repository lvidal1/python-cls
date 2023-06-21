import { StorageHelper, } from '@clearsummit/carabiners'

import { Cookies, StorageHelperTypes, } from '@/constants'

const LocalStorageService = StorageHelper({ type: StorageHelperTypes.local, })
const { getValue, setValue, deleteValue, } = LocalStorageService

export const setAuth = (data: { refresh?: string, access?: string }): void => setValue(Cookies.auth, JSON.stringify(data))
export const getAuth = (): JWTTokens | null => {
  const token = getValue(Cookies.auth)
  if (token) {
    return JSON.parse(token)
  }
  return null
}
export const deleteAuth = (): void => deleteValue(Cookies.auth)


export default {}
