import User, { UserDataType} from './user'

type RecognizedDeviceLogin = UserDataType

export type NewDeviceLogin = {
  last_two: string,
  device_token: string,
  id: false,
}

export type NewOrRecognizedLogin = NewDeviceLogin | RecognizedDeviceLogin

export type NewOrRecognizedLoginResponse = NewDeviceLogin | { user: User }

// 2FA Response Handling
export const LoginResponse = (data: RecognizedDeviceLogin | NewDeviceLogin) => {
  if (data.id) {
    return {
      user: new User(data),
    }
  }
  return data
}

export default {
  LoginResponse,
}
