import _ from 'lodash'
import moment from 'moment'

export const snakeToCamel = (key: string) =>
  key.replace(/([_][a-z])/gi, $1 => $1.toUpperCase().replace('_', ''))

export const makeDate = (date: string | Date, extra: number = 0): Date => {
  let newDate = new Date()
  if (typeof date === 'string') {
    const momentDate = moment(date, 'YYYY-MM-DD')
    momentDate.add(extra, 'd')
    newDate = momentDate.toDate()
  } else if (date instanceof Date) {
    newDate = date
  }
  return newDate
}

export const defaultString = (value: string | null | undefined): string => (value ? value.toString() : '')

export const defaultNumber = (value: string | null | undefined | number): number => {
  if (value) {
    const num = parseInt(value.toString(), 10)
    if (_.isFinite(num)) {
      return num
    }
  }
  return 0
}

export const defaultFloat = (value: string | null | undefined | number) => {
  if (value) {
    const num = parseFloat(value.toString())
    if (_.isFinite(num)) {
      return num
    }
  }
  return 0
}

export const defaultBoolean = (value: boolean | null | undefined): boolean => !!value

export const defaultArray = (value: any): any => {
  let list = []
  if (Array.isArray(value)) {
    list = value
  } else if (value) {
    list = [value]
  }
  return list
}

export function defaultEnum<EnumType, EnumObject>(
  value: EnumType | null | undefined,
  enumObj: EnumObject,
): EnumType | '' {
  return Object.values(enumObj).indexOf(value) > -1 && value !== null && value !== undefined
    ? value
    : ''
}

export const defaultObject = (value: any): Object | any =>
  _.isPlainObject(value) && value ? value : {}

export function defaultCamelCaseObject(value: {[key: string]: any} | null | undefined) {
  const obj: {[key: string]: any} = {}
  if (value) {
    Object.keys(value).forEach(key => {
      const currentValue = value[key]
      obj[snakeToCamel(key)] = currentValue
      if (Array.isArray(currentValue)) {
        obj[snakeToCamel(key)] = currentValue.map(x => defaultObject(x))
      } else if (typeof currentValue === 'object') {
        obj[snakeToCamel(key)] = defaultObject(currentValue)
      } else if (currentValue === 'true' || currentValue === 'false') {
        obj[snakeToCamel(key)] = JSON.parse(currentValue)
      }
    })
  }
  return obj
}

export default {
  defaultBoolean,
  defaultCamelCaseObject,
  defaultEnum,
  defaultFloat,
  defaultNumber,
  defaultObject,
  defaultString,
}
