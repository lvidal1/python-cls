import {
  ACTIONS, createApiReducer, createNetworkSagas,
  makeRequest, reducer, reduxSet,
} from './api'
import selectors from './api-selectors'
import { collectDispatchers, dispatchReducer, runReducers } from './dispatch-reduce'
import type {
  ApiPayload, ErrorActionPayloadType, ErrorType, RequestManagementStore,
} from './types'

export type {
  ApiPayload,
  ErrorActionPayloadType,
  ErrorType,
  RequestManagementStore,
}

export {
  runReducers,
  dispatchReducer,
  collectDispatchers,
  ACTIONS,
  makeRequest,
  reducer,
  reduxSet,
  createNetworkSagas,
  selectors,
  createApiReducer,
}
