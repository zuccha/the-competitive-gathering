import { IStoreState } from '../../../../../..'
import { IStanding } from '../../../../../../../types/Standing'

const selectStandings = (state: IStoreState): IStanding[] | undefined => {
  if (state.standings.ids.data === undefined) {
    return undefined
  }

  const byId = state.standings.byId
  const ids = state.standings.ids.data

  return ids
    .map(id => byId[id])
    .filter(standings => standings !== undefined)
}

export default selectStandings
