export function startRequest<StateType>(
  state: StateType,
  payload: { [key: string]: null | null | undefined } | null
): StateType {
  return {
    ...state,
    pending: true,
    ...payload,
  }
}

export function endRequest<StateType>(
  state: StateType,
  payload: { [key: string]: Error | null | undefined } | null
): StateType {
  return {
    ...state,
    pending: false,
    ...payload,
  }
}

export const resetStoreKeyClosure = (initialState: any) => (state: any, payload: string): any => ({
  ...state,
  [ payload ]: initialState[ payload ],
})

export const noOp = (state: any): any => ({
  ...state,
})

const apiReducers = {
  startRequest,
  endRequest,
  noOp,
}

export default apiReducers
