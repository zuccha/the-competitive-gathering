import { IStoreState } from '../../../../../..'
import { IMatch } from '../../../../../../../types/Match'

const selectMatches = (state: IStoreState): IMatch[] | undefined => {
  if (state.matches.ids.data === undefined) {
    return undefined
  }

  const byId = state.matches.byId
  const ids = state.matches.ids.data

  return ids
    .map(id => byId[id])
    .filter(match => match !== undefined)
}

export default selectMatches
