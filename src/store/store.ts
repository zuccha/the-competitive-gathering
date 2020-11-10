import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { authReducer } from './slices/auth'
import { leaguesReducer } from './slices/leagues'
import { leaguesMatchesReducer } from './slices/leaguesMatches'
import { leaguesStandingsReducer } from './slices/leaguesStandings'
import { overallStandingsReducer } from './slices/overallStandings'

const rootReducer = combineReducers({
  auth: authReducer,
  leagues: leaguesReducer,
  leaguesMatches: leaguesMatchesReducer,
  leaguesStandings: leaguesStandingsReducer,
  overallStandings: overallStandingsReducer,
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
