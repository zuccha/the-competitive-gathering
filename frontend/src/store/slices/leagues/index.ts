import useLeagueById from './hooks/useLeagueById'
import useLeagues from './hooks/useLeagues'
import leagues from './leagues'
import selectLeagueById from './selectors/selectLeagueById'
import selectLeagues from './selectors/selectLeagues'
import selectLeaguesStatus from './selectors/selectLeaguesStatus'
import selectLeagueStatusById from './selectors/selectLeagueStatusById'
import cancelLeagueById from './thunks/cancelLeagueById'
import createLeague from './thunks/createLeague'
import deleteLeagueById from './thunks/deleteLeagueById'
import enrollLeagueByIdAndUsername from './thunks/enrollLeagueByIdAndUsername'
import fetchLeagueById from './thunks/fetchLeagueById'
import fetchLeagues from './thunks/fetchLeagues'
import leaveLeagueByIdAndUsername from './thunks/leaveLeagueByIdAndUsername'
import startLeagueById from './thunks/startLeagueById'

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
  enrollLeagueByIdAndUsername,
  leaveLeagueByIdAndUsername,
  deleteLeagueById,
  startLeagueById,
  cancelLeagueById,
  useLeagueById,
  useLeagues,
}
