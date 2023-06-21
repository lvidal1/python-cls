import { dispatchReducer, runReducers } from './dispatch-reduce'
import {
  RequestManagementStore, RequestPayload, StandardAction, UpdateMetaPayload,
} from './types'
import {
  CONSTANTS, getErrorKey, getMetaKey,
  getPendingKey,
} from './utils'

export const ACTIONS = {
  RESTORE_INITIAL_STATE: 'RESTORE_INITIAL_STATE',
  MAKE_EVERY_REQUEST: 'MAKE_EVERY_REQUEST',
  MAKE_LATEST_REQUEST: 'MAKE_LATEST_REQUEST',
  START_REQUEST: 'START_REQUEST',
  END_REQUEST: 'END_REQUEST',
  UPDATE_META: 'UPDATE_META',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

export function startRequest<RequestManagementStore>(state: RequestManagementStore, payload: RequestPayload): RequestManagementStore {
  const {
    name, meta, error, pending,
  } = payload
  const errorKey = getErrorKey(name)
  const pendingKey = getPendingKey(name)
  const metaKey = getMetaKey(name)
  return {
    ...state,
    pending: true,
    [errorKey]: error,
    [pendingKey]: pending,
    [metaKey]: meta,
  }
}

export function endRequest<RequestManagementStore>(state: RequestManagementStore, payload: RequestPayload): RequestManagementStore {
  const {
    name, meta, error, pending,
  } = payload
  const errorKey = getErrorKey(name)
  const pendingKey = getPendingKey(name)
  const metaKey = getMetaKey(name)
  return {
    ...state,
    pending: false,
    [errorKey]: error,
    [pendingKey]: pending,
    [metaKey]: meta,
  }
}

export function makeRequest<RequestManagementStore>(state: RequestManagementStore): RequestManagementStore {
  return state
}

export const updateMeta = (state: RequestManagementStore, payload: UpdateMetaPayload): RequestManagementStore => {
  const { serviceKey, meta } = payload
  const metaKey = getMetaKey(serviceKey)
  return {
    ...state,
    [metaKey]: meta,
  }
}

const restoreInitialState = (state: RequestManagementStore): RequestManagementStore => {
  const newState: RequestManagementStore = Object.assign({}, state)
  Object.entries(state).forEach(([key]) => {
    if (key.includes(CONSTANTS.PENDING)) {
      newState[key] = false
    } else if (key.includes(CONSTANTS.ERROR) || key.includes(CONSTANTS.META)) {
      newState[key] = null
    }
  })
  return newState
}

export const clearError = (state: RequestManagementStore, serviceKey: string): RequestManagementStore => {
  const errorKey = getErrorKey(serviceKey)
  return {
    ...state,
    [errorKey]: null,
  }
}

export const reduxSet = {
  restoreInitialState: dispatchReducer<RequestManagementStore>(ACTIONS.RESTORE_INITIAL_STATE, restoreInitialState),
  makeRequest: dispatchReducer<RequestManagementStore>(ACTIONS.MAKE_EVERY_REQUEST, makeRequest),
  makeLatestRequest: dispatchReducer<RequestManagementStore>(ACTIONS.MAKE_LATEST_REQUEST, makeRequest),
  startRequest: dispatchReducer<RequestManagementStore, RequestPayload>(ACTIONS.START_REQUEST, startRequest),
  endRequest: dispatchReducer<RequestManagementStore, RequestPayload>(ACTIONS.END_REQUEST, endRequest),
  updateMeta: dispatchReducer<RequestManagementStore, UpdateMetaPayload>(ACTIONS.UPDATE_META, updateMeta),
  clearError: dispatchReducer<RequestManagementStore, string>(ACTIONS.CLEAR_ERROR, clearError),
}

export const reducer = (
  state: RequestManagementStore = {}, action: StandardAction,
): RequestManagementStore => runReducers(state, action, reduxSet)

export const createApiReducer = (initialState: RequestManagementStore = {}) => (
  state: RequestManagementStore = initialState, action: StandardAction,
): RequestManagementStore => runReducers(state, action, reduxSet)
