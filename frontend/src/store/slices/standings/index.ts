import standings from './standings'
import selectStandings from './slices/ids/selectors/selectStandings'
import selectStandingsStatus from './slices/ids/selectors/selectStandingsStatus'
import selectStandingsByLeague from './slices/idsByLeague/selectors/selectStandingsByLeague'
import selectStandingsStatusByLeague from './slices/idsByLeague/selectors/selectStandingsStatusByLeague'
import fetchStandings from './slices/ids/thunks/fetchStandings'
import fetchStandingsByLeague from './slices/idsByLeague/thunks/fetchStandingsByLeague'

const standingsReducer = standings.reducer

export {
  standingsReducer,
  selectStandings,
  selectStandingsStatus,
  selectStandingsByLeague,
  selectStandingsStatusByLeague,
  fetchStandings,
  fetchStandingsByLeague,
}
