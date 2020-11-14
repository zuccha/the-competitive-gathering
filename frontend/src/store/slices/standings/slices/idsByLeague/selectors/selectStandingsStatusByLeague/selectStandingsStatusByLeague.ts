import { IStoreState } from '../../../../../..'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectStandingsStatusByLeague = (leagueId: string) => (state: IStoreState): IRequestStatus => {
  return state.standings.idsByLeague[leagueId]
    ? state.standings.idsByLeague[leagueId].status
    : 'initial'
}

export default selectStandingsStatusByLeague
