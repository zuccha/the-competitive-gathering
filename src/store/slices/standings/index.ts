import standings from './standings'
import selectStandings from './selectors/selectStandings'
import selectStandingsByLeague from './selectors/selectStandingsByLeague'
import fetchStandings from './thunks/fetchStandings'
import fetchStandingsByLeague from './thunks/fetchStandingsByLeague'
import selectStandingsStatus from './selectors/selectStandingsStatus/selectStandingsStatus'
import selectStandingsStatusByLeague from './selectors/selectStandingsStatusByLeague'
import useStandings from './hooks/useStandings'
import useStandingsByLeague from './hooks/useStandingsByLeague'

const standingsReducer = standings.reducer

export {
  standingsReducer,
  selectStandings,
  selectStandingsStatus,
  selectStandingsByLeague,
  selectStandingsStatusByLeague,
  fetchStandings,
  fetchStandingsByLeague,
  useStandings,
  useStandingsByLeague,
}
