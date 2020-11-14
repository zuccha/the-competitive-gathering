import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ICredentials } from '../types/Credentials'
import LocalStorage from '../types/LocalStorage'
import Request from '../types/Request'
import { authReducer } from './slices/auth'
import { leaguesReducer } from './slices/leagues'
import { matchesReducer } from './slices/matches'
import { leaguesStandingsReducer } from './slices/leaguesStandings'
import { overallStandingsReducer } from './slices/overallStandings'

const rootReducer = combineReducers({
  auth: authReducer,
  leagues: leaguesReducer,
  matches: matchesReducer,
  leaguesStandings: leaguesStandingsReducer,
  overallStandings: overallStandingsReducer,
})

const credentials = LocalStorage.readCredentials()

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: credentials
      ? Request.makeSuccess(credentials)
      : Request.makeInitial<ICredentials>(),
  },
})

store.subscribe(() => {
  const auth = store.getState().auth
  LocalStorage.saveCredentials(auth.data)
})

export default store

export type IStoreDispatch = typeof store.dispatch
export type IStoreState = ReturnType<typeof rootReducer>
