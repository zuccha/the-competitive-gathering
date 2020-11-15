import useMatches from './hooks/useMatches'
import useMatchesByLeague from './hooks/useMatchesByLeague'
import matches from './matches'
import selectMatches from './selectors/selectMatches'
import selectMatchesByLeague from './selectors/selectMatchesByLeague'
import selectMatchesStatus from './selectors/selectMatchesStatus'
import selectMatchesStatusByLeague from './selectors/selectMatchesStatusByLeague'
import fetchMatches from './thunks/fetchMatches'
import fetchMatchesByLeague from './thunks/fetchMatchesByLeague'
import registerMatchResult from './thunks/registerMatchResult'

const matchesReducer = matches.reducer

export {
  matchesReducer,
  selectMatches,
  selectMatchesStatus,
  selectMatchesByLeague,
  selectMatchesStatusByLeague,
  fetchMatches,
  fetchMatchesByLeague,
  registerMatchResult,
  useMatches,
  useMatchesByLeague,
}
