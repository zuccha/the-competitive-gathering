import { combineReducers, createStore } from 'redux'
import { IAuthState, authReducer } from './slices/auth'

export interface IRootState {
  auth: IAuthState
}

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(rootReducer)

export default store
