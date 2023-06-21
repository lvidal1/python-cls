import {
  call, delay, ForkEffect,
  put, takeEvery, takeLatest,
} from 'redux-saga/effects'

import { ACTIONS, reduxSet } from './api-redux'
import {
  ApiMeta, ApiPayload, ErrorType, ResponseType, SagaGenerator, StandardAction,
} from './types'


function* executeRequest(service: { [key: string]: (...args: Array<unknown>) => [ResponseType, ErrorType] }, networkRequest: ApiPayload) {
  const { serviceKey, data } = networkRequest
  const result: [ResponseType, ErrorType] = yield call(service[(serviceKey as keyof typeof service)], data)
  return result
}

function* makeRequest(api: unknown, action: StandardAction<ApiPayload>): SagaGenerator {
  // Deep clone
  const newAction = { ...action }
  const {
    successActionCreator,
    errorActionCreator,
    preSendActionCreator,
    serviceKey,
    data,
    meta = null,
  } = action.payload
  let { pollCount } = action.payload
  let error = null
  const metaMarked: ApiMeta = { ...meta, finished: true }
  try {
    yield put(
      reduxSet.startRequest.dispatch({
        name: serviceKey,
        error: null,
        pending: true,
        meta: { ...meta, finished: false },
      }),
    )

    if (preSendActionCreator) {
      yield put(preSendActionCreator(data))
    }
    // @ts-ignore
    const [resp, err]: [ResponseType, ErrorType] = yield call(executeRequest, api, action.payload)

    if (resp) {
      // Setup all the successful response
      if (successActionCreator) {
        const respData = { ...resp, meta: metaMarked }
        yield put(successActionCreator(respData))
      }
      // It was successful so we don't need to poll and can send the final action
      pollCount = 0
    } else if (err && pollCount && err?.statusCode !== 500) {
      // Retry after 3 seconds, if client error occurs and pollCount declared
      yield delay(3000)
      newAction.payload.pollCount = pollCount - 1
      yield put(newAction)
    }

    if (err?.statusCode === 500) {
      // Internal server error stop polling
      pollCount = 0
    }

    if (err) {
      error = err
    }
  } catch (e) {
    error = e
    // Failure
  } finally {
    // Only dispatch error if we are not polling
    if (!pollCount) {
      // Check if we set an error and there is an error dispatch key
      if (error) {
        if (errorActionCreator) {
          yield put(errorActionCreator({ error, meta: metaMarked }))
        }
      }
      yield put(
        reduxSet.endRequest.dispatch({
          name: serviceKey,
          error,
          pending: false,
          meta: metaMarked,
        }),
      )
    }
  }
}

function createNetworkSagas<S>(api: S): Array<ForkEffect<never>> {
  return [
    takeEvery(ACTIONS.MAKE_EVERY_REQUEST, makeRequest, api),
    takeLatest(ACTIONS.MAKE_LATEST_REQUEST, makeRequest, api),
  ]
}

export { makeRequest }
export default createNetworkSagas
