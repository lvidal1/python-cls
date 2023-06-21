import {
  ErrorActionPayloadType, ResponseType, StandardAction,
} from '../src/types'

const initialStore = {
  api: {
    errorPending: false,
    errorError: null,
    successPending: false,
    successError: null,
    pollPending: false,
    pollError: null,
  },
  hike: {},
}

export const ACTIONS = {
  CLEAR_MOUNTAIN: 'CLEAR_MOUNTAIN',
  ERROR_MOUNTAIN: 'ERROR_MOUNTAIN',
  SUCCESS_MOUNTAIN: 'SUCCESS_MOUNTAIN',
}

function reducer(state: typeof initialStore = initialStore, action: StandardAction<Record<string, unknown>>): typeof initialStore {
  if (action.type === 'END_REQUEST') {
    return {
      ...state,
      api: {
        ...state.api,
        ...action.payload,
      },
    }
  }
  return state
}

const actionCreators = {
  hike: {
    clearMountain: { dispatch: (): StandardAction<Record<string, unknown>> => ({ type: ACTIONS.CLEAR_MOUNTAIN, payload: null }) },
    errorMountain: { dispatch: (): StandardAction<ErrorActionPayloadType> => ({ type: ACTIONS.ERROR_MOUNTAIN, payload: null }) },
    successMountain: { dispatch: (respData: ResponseType): StandardAction<ResponseType> => ({ type: ACTIONS.SUCCESS_MOUNTAIN, payload: respData }) },
  },
}

export { reducer, actionCreators }
