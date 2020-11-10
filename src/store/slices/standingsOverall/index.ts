import standingsOverall, { IStandingsOverallState } from './standingsOverall'
import selectStandingsOverall from './selectors/selectStandingsOverall'
import fetchStandingsOverall from './thunks/fetchStandingsOverall'

export const standingsOverallReducer = standingsOverall.reducer
export { fetchStandingsOverall }
export { selectStandingsOverall }
export type { IStandingsOverallState }
