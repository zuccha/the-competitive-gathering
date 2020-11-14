import leagues from './leagues'
import selectLeagueById from './selectors/selectLeagueById'
import selectLeagues from './selectors/selectLeagues'
import selectLeaguesStatus from './selectors/selectLeaguesStatus'
import selectLeagueStatusById from './selectors/selectLeagueStatusById'
import createLeague from './thunks/createLeague'
import fetchLeagueById from './thunks/fetchLeagueById'
import fetchLeagues from './thunks/fetchLeagues'

const leaguesReducer = leagues.reducer

export {
  leaguesReducer,
  selectLeagueById,
  selectLeagueStatusById,
  selectLeagues,
  selectLeaguesStatus,
  fetchLeagueById,
  fetchLeagues,
  createLeague,
}
