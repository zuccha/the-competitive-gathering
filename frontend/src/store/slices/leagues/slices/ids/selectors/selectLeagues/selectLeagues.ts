import { IStoreState } from '../../../../../..'
import { ILeague } from '../../../../../../../types/League'

const selectLeagues = (state: IStoreState): ILeague[] | undefined => {
  if (state.leagues.ids.data === undefined) {
    return undefined
  }

  const byId = state.leagues.byId
  const ids = state.leagues.ids.data

  return ids
    .map(id => byId[id])
    .filter(league => league !== undefined)
}

export default selectLeagues
