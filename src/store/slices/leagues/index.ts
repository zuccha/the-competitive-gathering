import leagues, { ILeaguesState } from './leagues'
import selectLeagues from './selectors/selectLeagues'
import createLeague from './thunks/createLeague'
import fetchLeagues from './thunks/fetchLeagues'

export const leaguesReducer = leagues.reducer
export { createLeague }
export { fetchLeagues }
export { selectLeagues }
export type { ILeaguesState }
