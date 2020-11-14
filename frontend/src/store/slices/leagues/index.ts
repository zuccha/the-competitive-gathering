import leagues from './leagues'
import selectLeagueById from './slices/byId/selectors/selectLeagueById'
import selectLeagueStatusById from './slices/byId/selectors/selectLeagueStatusById'
import fetchLeagueById from './slices/byId/thunks/fetchLeagueById'
import selectLeagues from './slices/ids/selectors/selectLeagues'
import selectLeaguesStatus from './slices/ids/selectors/selectLeaguesStatus'
import fetchLeagues from './slices/ids/thunks/fetchLeagues'
import createLeague from './thunks/createLeague'

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
