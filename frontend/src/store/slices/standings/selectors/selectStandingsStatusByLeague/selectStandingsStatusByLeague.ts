import { createSelector } from '@reduxjs/toolkit'
import { IRequest } from '../../../../../types/Request'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectStandingsStatusByLeague = (leagueId: string) => createSelector<
  IStoreState,
  Record<string, IRequest<string[]>>,
  IRequestStatus
>(
  state => state.standings.idsByLeague,
  idsByLeague => {
    return idsByLeague[leagueId] === undefined
      ? 'initial'
      : idsByLeague[leagueId].status
  },
)

export default selectStandingsStatusByLeague
