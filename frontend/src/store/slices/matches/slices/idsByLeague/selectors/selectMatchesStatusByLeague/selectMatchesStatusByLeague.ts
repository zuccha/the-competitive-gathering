import { IStoreState } from '../../../../../..'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectMatchesStatusByLeague = (leagueId: string) => (state: IStoreState): IRequestStatus => {
  return state.matches.idsByLeague[leagueId]
    ? state.matches.idsByLeague[leagueId].status
    : 'initial'
}

export default selectMatchesStatusByLeague
