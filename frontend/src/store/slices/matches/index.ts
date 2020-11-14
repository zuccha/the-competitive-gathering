import matches from './matches'
import selectMatches from './slices/ids/selectors/selectMatches'
import selectMatchesStatus from './slices/ids/selectors/selectMatchesStatus'
import selectMatchesByLeague from './slices/idsByLeague/selectors/selectMatchesByLeague'
import selectMatchesStatusByLeague from './slices/idsByLeague/selectors/selectMatchesStatusByLeague'
import fetchMatches from './slices/ids/thunks/fetchMatches'
import fetchMatchesByLeague from './slices/idsByLeague/thunks/fetchMatchesByLeague'
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
}
