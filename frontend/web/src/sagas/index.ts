import { createNetworkSagas, } from '@clearsummit/radio-dispatch'
import { all, takeLatest, } from 'redux-saga/effects'

import services from '@/helpers/services'
import { ACTIONS as USER_ACTIONS, } from '@/redux/user'

import * as user from './user'

export { user, }

export default function* root(): GeneratorType {
  yield all(createNetworkSagas(services))
  yield all([
    takeLatest(USER_ACTIONS.SET_USER_SESSION, user.setUserSession),
    takeLatest(USER_ACTIONS.CREATE_USER, user.setUserSession),
    takeLatest(USER_ACTIONS.LOGOUT, user.logout),
  ])
}
