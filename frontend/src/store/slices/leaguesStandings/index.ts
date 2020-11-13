import leaguesStandings, { ILeaguesStandingsState } from './leaguesStandings'
import selectGetLeagueStandings from './selectors/selectGetLeagueStandings'
import fetchStandingsByLeague from './thunks/fetchStandingsByLeague'

export const leaguesStandingsReducer = leaguesStandings.reducer
export { fetchStandingsByLeague }
export { selectGetLeagueStandings }
export type { ILeaguesStandingsState }
