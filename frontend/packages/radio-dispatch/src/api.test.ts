/* eslint-disable max-lines-per-function */

import { expectSaga } from 'redux-saga-test-plan'
import { delay } from 'redux-saga/effects'

import Api from '../__mocks__/api'
import mountains from '../__mocks__/data'
import { actionCreators, reducer } from '../__mocks__/redux'
import { ApiPayload } from '.'
import { makeRequest as apiSaga, reduxSet } from './api'
import { ErrorType } from './types'

const serviceKey = 'getMountain'

const defaultPayload: ApiPayload<typeof Api, any, any> = {
  serviceKey,
  data: 0,
}

const axiosAdaptor = async (fn: (args: unknown) => Promise<{data: unknown, status: number}>, args: unknown) => {
  let resp
  let err
  try {
    const response = await fn(args)
    resp = { statusCode: response.status, data: response.data }
  } catch (e) {
    err = { statusCode: e.response.status, details: e.response.data.error }
  }
  return [resp, err]
}

const api = {
  getMountain: (id: number) => axiosAdaptor(Api.getMountain, id),
}


describe('apiSaga', () => {
  it('makes a request including successAction', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({ ...defaultPayload, successActionCreator: actionCreators.hike.successMountain.dispatch } as ApiPayload<any>),
    }

    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .call(api.getMountain, 0)
      .put(actionCreators.hike.successMountain.dispatch({
        statusCode: 200,
        data: mountains[0],
        meta: { finished: true },
      }))
      .run()
  })

  it('handles errors including errorAction', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({ ...defaultPayload, data: 22, errorActionCreator: actionCreators.hike.errorMountain.dispatch } as ApiPayload<any>),
    }
    const error: ErrorType = { statusCode: 404, details: 'Data not available' }
    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .call(api.getMountain, 22)
      .put(
        reduxSet.endRequest.dispatch({
          name: 'getMountain',
          error,
          pending: false,
          meta: { finished: true },
        }),
      )
      .put(actionCreators.hike.errorMountain.dispatch())
      .run()
  })

  it('sends Prerequest', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({ ...defaultPayload, preSendActionCreator: actionCreators.hike.clearMountain.dispatch } as ApiPayload<any>),
    }

    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .call(api.getMountain, 0)
      .run()
  })

  it('it polls', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({ ...defaultPayload, pollCount: 2, data: 22 } as ApiPayload<any>),
    }

    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .provide({
        call(effect, next) {
          if (effect.fn === delay(1).payload.fn) {
            return null
          }
          return next()
        },
      })
      .call(api.getMountain, 22)
      .put({ ...action, payload: { ...action.payload, pollCount: 1 } })
      .run()
  })

  it('it sets meta attribute', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({
        ...defaultPayload, pollCount: 2, data: 2, meta: { id: 543 },
      } as ApiPayload<any>),
    }

    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .call(api.getMountain, 2)
      .put({
        ...action,
        payload: {
          name: 'getMountain',
          error: null,
          pending: true,
          meta: { id: 543, finished: false },
        },
      })
      .run()
  })

  it('it returns same payload shape with meta', () => {
    const action = {
      type: 'START_REQUEST',
      payload: ({ ...defaultPayload, successActionCreator: actionCreators.hike.successMountain.dispatch, meta: { id: 0 } } as ApiPayload<any>),
    }

    return expectSaga(apiSaga, api, action)
      .withReducer(reducer)
      .call(api.getMountain, 0)
      .put(actionCreators.hike.successMountain.dispatch({
        statusCode: 200,
        data: mountains[0],
        meta: { id: 0, finished: true },
      }))
      .run()
  })
})
