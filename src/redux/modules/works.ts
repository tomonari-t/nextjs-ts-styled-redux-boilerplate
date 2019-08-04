import { reducerWithInitialState } from 'typescript-fsa-reducers'

export interface IWorksState {
  data: {
    works: any[]
  }
  meta: {
    error: any
    loading: boolean
  }
}

const INITIAL_STATE: IWorksState = {
  data: {
    works: [],
  },
  meta: {
    error: null,
    loading: false,
  },
}

export default reducerWithInitialState(INITIAL_STATE)
