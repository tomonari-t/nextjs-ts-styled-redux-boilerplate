import { combineReducers } from 'redux'
import works, { IWorksState } from './works'

export interface IMisRootState {
  works: IWorksState
}

export default combineReducers([works])
