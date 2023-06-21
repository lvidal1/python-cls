import BaseModel from './base-model'
import { defaultObject, defaultString } from './defaults'

export type UserDataType = {
  email: string | null | undefined,
  name: string | null | undefined,
  token: { refresh?: string, access?: string } | undefined | null,
  id: string | null | undefined,
}

export default class User extends BaseModel {
  id: string

  email: string

  name: string

  token: { refresh?: string, access?: string }

  constructor(
    data: UserDataType = {
      email: null,
      name: null,
      token: null,
      id: null,
    },
  ) {
    super()
    this.id = defaultString(data.id)
    this.email = defaultString(data.email)
    this.name = defaultString(data.name)
    this.token = defaultObject(data.token)
  }

  get valid(): boolean {
    return !!this.id
  }
}
