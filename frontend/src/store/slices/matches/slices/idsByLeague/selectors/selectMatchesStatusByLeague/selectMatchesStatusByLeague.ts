import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectMatchesStatusByLeague = (leagueId: string) => createSelector<
  IStoreState,
  Record<string, IRequest<string[]>>,
  IRequestStatus
>(
  state => state.matches.idsByLeague,
  idsByLeague => {
    return idsByLeague[leagueId] === undefined
      ? 'initial'
      : idsByLeague[leagueId].status
  },
)

export default selectMatchesStatusByLeague
