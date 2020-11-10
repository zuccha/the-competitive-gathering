import overallStandings, { IOverallStandingsState } from './overallStandings'
import selectOverallStandings from './selectors/selectOverallStandings'
import fetchOverallStandings from './thunks/fetchOverallStandings'

export const overallStandingsReducer = overallStandings.reducer
export { fetchOverallStandings }
export { selectOverallStandings }
export type { IOverallStandingsState }
