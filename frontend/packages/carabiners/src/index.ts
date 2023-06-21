import StorageHelperDefault from './helpers/storage'

const uuidv4 = require('uuid/v4')

/**
 * Joins strings with a character.
 * @param {string | {char: string}} config - The first optional can optional be a config to change the joining character.
 * by defaults it joins with a space
 * @param {string} args - The rest of the args should be strings and are spread into a variable
 */
export const joinStr = (config: { char: string } | string, ...args: Array<string| null>) => {
  let char = ' '
  const values = args
  if (typeof config === 'object') {
    ;({ char } = config)
  } else {
    values.unshift(config)
  }
  return values.reduce((acc, curr, idx) => {
    let newValue = acc
    if (curr) {
      if (idx === 0) {
        newValue = curr
      } else {
        newValue = `${acc}${char}${curr}`
      }
    }
    return newValue
  }, '')
}

/**
 * Decodes a query string into an object
 * @param {string} query - Query string
 */
export const createSearchObject = (query: string): { [key: string]: string } => {
  const pathArray = query.replace('?', '').split('&')
  const locationObj = {}

  pathArray.forEach(keyValuePair => {
    const [key, value] = keyValuePair.split('=')
    if (key && value) {
      // @ts-ignore
      locationObj[key] = value
    }
  })
  return locationObj
}

/**
 * Formats an object into a query string
 * @param { {[key: string]: string} } config - Object with json serializable values to be turned into a query string
 */
export const createSearchString = (obj: { [key: string]: string }): string => {
  if (Object.keys(obj).length) {
    let params = Object.entries(obj).map(([key, val]) =>
      typeof val === 'string' ? `${key}=${val}` : null,
    )
    // @ts-ignore
    params = joinStr({ char: '&' }, ...params)
    return `?${params}`
  }
  return ''
}

export const generateUUID = () => uuidv4()

export const StorageHelper = StorageHelperDefault
