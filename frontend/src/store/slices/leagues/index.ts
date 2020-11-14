import leagues from './leagues'
import selectLeagues from './slices/ids/selectors/selectLeagues'
import selectLeaguesStatus from './slices/ids/selectors/selectLeaguesStatus'
import fetchLeagues from './slices/ids/thunks/fetchLeagues'
import createLeague from './thunks/createLeague'

const leaguesReducer = leagues.reducer

export {
  leaguesReducer,
  selectLeagues,
  selectLeaguesStatus,
  fetchLeagues,
  createLeague,
}
