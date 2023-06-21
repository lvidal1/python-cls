import { DispatcherSet, DispatchResponse, StandardAction } from './types'

export function dispatchReducer<S, T = unknown>(
  type: string,
  reducer: (state: S, payload: T) => S,
): DispatchResponse<S, T> {
  return {
    type,
    reducer,
    dispatch: (payload?: T) => ({ type, payload }),
  }
}

export function collectDispatchers<S>(
  reduxSets: { [key: string]: DispatchResponse<S, unknown> | DispatcherSet },
): { [key: string]: (payload: unknown) => StandardAction<unknown> } {
  const dispatchers: { [key: string]: (payload: unknown) => StandardAction<unknown> } = {}
  Object.keys(reduxSets).forEach((key) => {
    const value = reduxSets[key]
    if (value.dispatch) {
      dispatchers[key] = (value.dispatch as (payload: unknown) => StandardAction<unknown>)
    }
  })
  return dispatchers
}

// State in should equal type of state out

export function runReducers<S>(
  state: S,
  action: StandardAction<unknown>,
  reducers: { [key: string]: DispatchResponse<S, any> | DispatcherSet },
): S {
  let newState = { ...state }
  const reduce = (reducerSet: { [key: string]: DispatchResponse<S, unknown> | DispatcherSet }) => {
    Object.keys(reducerSet).forEach((key) => {
      const value = reducerSet[key]
      if (value) {
        if (value.type === undefined) {
          newState = reduce((value as unknown) as { [key: string]: DispatchResponse<S, unknown> })
        } else if (value.type === action.type) {
          newState = (value as DispatchResponse<S, unknown>).reducer(newState, action.payload)
        }
      }
    })
    return newState
  }
  return reduce(reducers)
}
