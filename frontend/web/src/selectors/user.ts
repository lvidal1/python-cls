import { User, } from '@challenge/models'

import { StoreState, UserStoreState, }  from '../redux'

const getUserStore = (store: StoreState): UserStoreState => store.user

const getUser = (store: StoreState): User | null | undefined => getUserStore(store).user

const getPending = (store: StoreState): boolean => getUserStore(store).pending

export default {
  getUser,
  getPending,
}
