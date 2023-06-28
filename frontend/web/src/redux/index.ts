import { User, Notification, } from '@challenge/models'
import { createApiReducer, reduxSet as apiAC, } from '@clearsummit/radio-dispatch'
import { connectRouter, routerMiddleware, } from 'connected-react-router'
import { applyMiddleware,combineReducers, compose, createStore, } from 'redux'
import createSagaMiddleware from 'redux-saga'

import history from '@/helpers/history'
import rootSaga from '@/sagas'

import { INITIAL_STATE as APIInitialState, } from './api'
import { INITIAL_STATE as UserInitialState,reducer as user, reduxSet as userAC, } from './user'


export type APIStoreState = any

export interface UserStoreState {
  user: User | null
  pending: boolean
  error: string | null
  notifications : Notification[]
}

export interface StoreState {
  api: APIStoreState,
  user: UserStoreState,
}

// Strange higher-order function to potentially modify the result
const logAction = (store: StoreState) => (next: (action: StandardAction) => void) => (action: StandardAction) => {
  // @ts-ignore
  const before = store.getState()
  const result = next(action)
  if (process.env.NODE_ENV !== 'production') {
    // Group these console logs into one closed group
    /* eslint-disable no-console */
    // @ts-ignore
    const after = store.getState()
    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('BEFORE', before)
    console.log('ACTION', action.type, action)
    console.log('AFTER', after)
    console.groupEnd()
    /* eslint-enable no-console */
  }

  return result
}

const reducers = combineReducers({
  api: createApiReducer(APIInitialState),
  router: connectRouter(history),
  user,
})

export const InitialState = {
  api: APIInitialState,
  user: UserInitialState,
}

export const ActionCreators = {
  api: apiAC,
  user: userAC,
}

const configureStore = (initialState: StoreState = InitialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, logAction, routerMiddleware(history),]
  // @ts-ignore
  let middleware = applyMiddleware(...middlewares)

  if (process.env.NODE_ENV !== 'production') {
    const { __REDUX_DEVTOOLS_EXTENSION__, } = (window as any);
    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
      middleware = compose(
        middleware,
        __REDUX_DEVTOOLS_EXTENSION__()
      )
    }
  }

  const store = createStore(reducers, initialState, middleware)
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
