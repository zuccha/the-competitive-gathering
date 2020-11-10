import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { authReducer } from './slices/auth'
import { standingsOverallReducer } from './slices/standingsOverall'

const rootReducer = combineReducers({
  auth: authReducer,
  standingsOverall: standingsOverallReducer,
})

const auth = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth') as string)
  : undefined

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { auth },
})

store.subscribe(() => {
  const auth = store.getState().auth
  localStorage.setItem('auth', JSON.stringify(auth))
})

export default store

export type IStoreDispatch = typeof store.dispatch
export type IStoreState = ReturnType<typeof rootReducer>
