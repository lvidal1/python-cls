import BaseModel from './base-model'
import { defaultString , defaultBoolean } from './defaults'

export type NotificationDataType = {
  id: string | null | undefined;
  created_at: string | null | undefined;
  seen: boolean;
  type: keyof NotificationTypeValues | null | undefined;
};

type NotificationTypeValues = {
  welcome: string;
  alert: string;
};

export default class Notification extends BaseModel {
  id: string

  created_at: string

  seen: boolean

  type: string

  constructor(
    data: NotificationDataType = {
      created_at: null,
      seen: false,
      type: null,
      id: null,
    },
  ) {
    super()
    this.id = defaultString(data.id)
    this.type = defaultString(data.type)
    this.seen = defaultBoolean(data.seen)
    this.created_at = defaultString(data.created_at)
  }

}
