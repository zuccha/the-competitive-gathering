import { IStoreState } from '../../../../../..'
import { IMatch } from '../../../../../../../types/Match'

const selectMatchesByLeague = (leagueId: string) => (state: IStoreState): IMatch[] | undefined => {
  if (state.matches.idsByLeague[leagueId]?.data === undefined) {
    return undefined
  }

  const byId = state.matches.byId
  const ids = state.matches.idsByLeague[leagueId].data!

  return ids
    .map(id => byId[id])
    .filter(match => match !== undefined)
}

export default selectMatchesByLeague
