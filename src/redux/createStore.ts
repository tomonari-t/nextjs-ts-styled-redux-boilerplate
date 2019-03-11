import { createStore, combineReducers } from 'redux'
import { IWeb3 } from './modules/web3'

export interface IStoreState {
  web3: IWeb3
}

const store = createStore(combineReducers<IStoreState>({}))
