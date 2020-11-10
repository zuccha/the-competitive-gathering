import leaguesStandings, { ILeaguesStandingsState } from './leaguesStandings'
import selectLeaguesStandings from './selectors/selectLeaguesStandings'
import fetchStandingsByLeague from './thunks/fetchStandingsByLeague'

export const leaguesStandingsReducer = leaguesStandings.reducer
export { fetchStandingsByLeague }
export { selectLeaguesStandings }
export type { ILeaguesStandingsState }
