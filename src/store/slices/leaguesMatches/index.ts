import leaguesMatches, { ILeaguesMatchesState } from './leaguesMatches'
import selectGetLeagueMatches from './selectors/selectGetLeagueMatches'
import fetchMatchesByLeague from './thunks/fetchMatchesByLeague'

export const leaguesMatchesReducer = leaguesMatches.reducer
export { fetchMatchesByLeague }
export { selectGetLeagueMatches }
export type { ILeaguesMatchesState }
