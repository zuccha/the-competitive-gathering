import { combineReducers } from 'redux'
import byId from './slices/byId'
import ids from './slices/ids'
import idsByLeague from './slices/idsByLeague'

const standings = {
  reducer: combineReducers({
    byId: byId.reducer,
    ids: ids.reducer,
    idsByLeague: idsByLeague.reducer,
  }),
}

export default standings
