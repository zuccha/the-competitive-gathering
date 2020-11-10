import leagues, { ILeaguesState } from './leagues'
import selectLeagues from './selectors/selectLeagues'
import fetchLeagues from './thunks/fetchLeagues'

export const leaguesReducer = leagues.reducer
export { fetchLeagues }
export { selectLeagues }
export type { ILeaguesState }
