import leaguesMatches, { ILeaguesMatchesState } from './leaguesMatches'
import selectGetLeagueMatches from './selectors/selectGetLeagueMatches'
import fetchMatchesByLeague from './thunks/fetchMatchesByLeague'
import registerMatchResult from './thunks/registerMatchResult'

export const leaguesMatchesReducer = leaguesMatches.reducer
export { fetchMatchesByLeague }
export { registerMatchResult }
export { selectGetLeagueMatches }
export type { ILeaguesMatchesState }
