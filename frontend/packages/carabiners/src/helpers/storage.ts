const DEFAULT_COOKIE_EXPIRATION = 60 * 24 * 7 // 1 week

export const StorageHelperTypes = {
  cookie: 'cookie',
  local: 'local',
}

type HelperConfig = {
  type?: typeof StorageHelperTypes[keyof typeof StorageHelperTypes],
  expiration?: number,
}

const defaultConfig = {
  type: StorageHelperTypes.cookie,
  expiration: DEFAULT_COOKIE_EXPIRATION,
}

const StorageHelper = (options: HelperConfig = defaultConfig) => {
  const { expiration, type } = options

  const getCookie = (name: string) => {
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }
  const setCookie = (name: string, data: string) => {
    let expires = ''
    if (expiration) {
      const date = new Date()
      date.setTime(date.getTime() + expiration * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${name}=${data || ''}${expires}; path=/`
  }

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999;`
  }

  const getLocalStorage = (name: string) => localStorage.getItem(name)

  const setLocalStorage = (name: string, data: string) => {
    localStorage.setItem(name, data)
  }

  const deleteLocalStorage = (name: string) => {
    localStorage.setItem(name, '')
  }

  const isCookie = type === StorageHelperTypes.cookie
  const getValue = isCookie ? getCookie : getLocalStorage
  const setValue = isCookie ? setCookie : setLocalStorage
  const deleteValue = isCookie ? deleteCookie : deleteLocalStorage
  return {
    setValue,
    getValue,
    deleteValue,
  }
}

export default StorageHelper
