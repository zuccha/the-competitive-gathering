import { combineReducers } from 'redux'
import byId from './slices/byId'
import ids from './slices/ids'

const leagues = {
  reducer: combineReducers({
    byId: byId.reducer,
    ids: ids.reducer,
  }),
}

export default leagues
