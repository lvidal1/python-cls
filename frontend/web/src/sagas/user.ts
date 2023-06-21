import { User, } from '@challenge/models'
import { call, } from 'redux-saga/effects'

import { Routes, } from '@/constants'
import { deleteAuth, setAuth, } from '@/helpers/auth'
import history from '@/helpers/history'

import ApiService from '../helpers/ApiService'
// eslint-disable-next-line no-unused-vars
export function* setUserSession(action: {
  type: string,
  payload: { data: { user: User } },
}): GeneratorType {
  // @ts-ignore
  ApiService.setAuthHeader(action.payload.data.user.token.access)
  setAuth(action.payload.data.user.token)
  yield call(history.push, Routes.Home)
}

export function* logout(): GeneratorType {
  yield call(deleteAuth)
  yield call(history.push, Routes.Login)
}

export default { setUserSession, }
