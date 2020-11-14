import { IStoreState } from '../../../../../..'
import { IStanding } from '../../../../../../../types/Standing'

const selectStandingsByLeague = (leagueId: string) => (state: IStoreState): IStanding[] | undefined => {
  if (state.standings.idsByLeague[leagueId]?.data === undefined) {
    return undefined
  }

  const byId = state.standings.byId
  const ids = state.standings.idsByLeague[leagueId].data!

  return ids
    .map(id => byId[id])
    .filter(standing => standing !== undefined)
}

export default selectStandingsByLeague
