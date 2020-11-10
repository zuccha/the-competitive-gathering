import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { authReducer } from './slices/auth'

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type IStoreState = ReturnType<typeof rootReducer>
export type IStoreDispatch = typeof store.dispatch
