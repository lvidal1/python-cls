import BaseModel from './base-model'
import mappers from './mappers'
import User from './user'
import Notification from './notification'

const models = {
  User,
  Notification,
  ...mappers,
}

export const ModelTypes: { [key: string]: string } = Object.keys(models).reduce((acc: {[key: string]: string}, curr: string) => {
  acc[curr] = curr
  return acc
}, {})

export function modelMapper(responseType: string, data: Object) {
  const Model = models[(responseType as keyof typeof models)]
  if (Object.getPrototypeOf(Model).prototype === BaseModel.prototype) {
    let modeled = null
    if (Array.isArray(data)) {
      // @ts-ignore
      modeled = data.map(d => new Model(d))
    } else {
      // @ts-ignore
      modeled = new Model(data)
    }
    return { [responseType.toLocaleLowerCase()]: modeled }
  }
  if (typeof Model === 'function') {
    // @ts-ignore
    return Model(data)
  }
  return data
}

export { User, Notification }

export default models
