# `Radio Dispatch`

> #### `Redux and Saga Helpers`

## Goal

The goal of this project is to reduce redux and saga boilerplate. `@clearsummit/radio-dispatch` contains generic redux helpers. `@clearsummit/radio-dispatch/api` contains a redux/ saga pattern for making api requests.

## Usage

---

### Dispatch Reduce

> Easily build dispatch and reducer functions

```
import { dispatchReducer, runReducers } from '@clearsummit/radio-dispatch'

export const reduxSet = {
    firstName: dispatchReducer(C.TEST_ACTION, (state, firstName: string): StoreState => ({ ...state, first_name: firstName })),
}

export const reducer = (state: StoreState = { ...store }, action: StandardAction<*>): StoreState => runReducers(state, action, reduxSet)

dispatchers.firstName.dispatch('Shane')  // success
dispatchers.firstName.dispatch(false)    // type error
```

#### `dispatchReducer`

Returns an object with the action `type`, `dispatach` function, and `reducer` function. It should be used to create values for an object of named redux actions.

#### `runReducers`

`runReducers` should be returned by the reduce function exported to the store. It is curried the `state` and `action` arguments from `reduce` and also passed the `reuxSet`. It will use the action to find the appropriate reducer in reduxSet and use it to return an updates state object.

When using this library it is considered good practice to export an object of your reduxSets by store key. The Network helper relies on this.

### Network

> Easily make and manage side effects for network requests

### Redux Helpers

The api saga relays on an `api` store in redux. It will use this store to store state for every request made. State for requests are pending - `${serviceKey}, Pending`, error - `${serviceKey}Error`, \meta = `${serviceKey}Meta`

#### `createReducer`

The createReducer should be called with the initial state of the api store and the value configured under `api` in the actionCreators object

### `initialState`

The library consumer is responsible for setting initial state with the default keys and values. Meta and error types are `?Object`, the pending type is `boolean`. Default values are `null` for error and meta keys and `false` for pending keys.

### `reduxSet / ACTIONS`

Under the hood, the network saga helper uses the `dispatch-reduce` helper. It creates an `reduxSet` object with these functions.

**public** `makeRequest`
Dispatch this action to start a request with the `takeEvery` effect. Each request will be executed even if the same request is made twice.

The action payload should be of the `APIPayloadType`

**public** `makeLatestRequest`
Dispatch this action to start a request with the `takeLatest` effect. Only the most recent request will be completed. If a duplicate request is made it will be canceled.

The action payload should be of the `APIPayloadType`

> #### **NOTE**
>
> Every time this action is dispatched it will cancel previous requests even if they have different payloads because the type will be the same.

**public** `restoreInitialState`
Takes the current `api` store, iterates over the values and sets all pending values to false and error/ meta values to null.

**public** `updateMeta`
Allows for the request meta at a key to be updated.

**private** `startRequest`
This is used internal by the request to set the pending and error keys.

```
{ [`${serviceKey}Pending`]: true, [`${serviceKey}Error`]: null, [`${serviceKey}Meta`]: meta}
```

**private** `endRequest`
This is used internal by the request to set the pending and error keys.

```
{ [`${serviceKey}Pending`]: false, [`${serviceKey}Error`]: error, [`${serviceKey}Meta`]: null}
```

#### ApiPayloadType

The ApiPayload type controls the flows of the NetworkSaga

```
interface ApiPayloadType<PayloadDataType> {
  serviceKey: keyof S;
  data: T;
  preSendActionCreator?: (data: unknown) => StandardAction<unknown>;
  successActionCreator?: (data: unknown) => StandardAction<unknown>;
  errorActionCreator?: (data: unknown) => StandardAction<unknown>;
  pollCount?: number;
  meta?: ApiMeta;
}
```

**Required**

- `serviceKey` - Used to call the async function on the Api object by key. The function should be type ``() => [ResponseType, ErrorType]```

  type: keyof typeof Service

**Optional**  

- `data` - This is the payload that will sent

  type: PayloadDataType

- `preSendActionCreator` - This will grab a reducer using the store name `preSendActionCreator` and fire it before the request is made

  type: ReduxAction | null | undefined;

- `successActionCreator` - This will grab a reducer using the store name `successActionCreator` and fire it if the request succeeds

  type: ReduxAction | null | undefined;

- `errorActionCreator` - This will grab a reducer using the store name `successActionCreator` and fire it if the request fails

  type: ReduxAction | null | undefined;

- `pollCount` - If this key exists and is greater than 1, the request will poll until it succeeds

  type: number;

- `meta` - Optional request metadata that can be set in the store to track the request.

  type: Object;


### Selectors

The libray comes with redux selectors for grabbing values from the api store. They are setup with a polymorphic type that accepts an enum type of the endpoints used by the api saga

`getError` - get error message
`getErrorObj` - get raw error object
`getPending` - get pending boolean
`getMeta` - get set meta object

### Saga

Setup the saga

#### `createNetworkSagas`
You can configure the apiSaga by using the createNeworkSagas helper. It requires your api instance with methods that will be referenced by the serviceKey key in the apiPayloads and the `actionCreators` object. It returns an array with api sagas configured with `takeEvery` and `takeLatest` effects.

```
import { createNetworkSagas } from '@clearsummit/radio-dispatch/api'
import ApiService from '@/helers/ApiService

export default function* root(): GeneratorType {
  yield all(
    createNetworkSagas(ApiService)
  )
}

```
