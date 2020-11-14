import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IStanding } from '../../../../../../../types/Standing'
import isNotUndefined from '../../../../../../../utils/isNotUndefined'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectStandingsByLeague = (leagueId: string) => createSelector<
  IStoreState,
  Record<string, IRequest<IStanding>>,
  Record<string, IRequest<string[]>>,
  IStanding[] | undefined
>(
  state => state.standings.byId,
  state => state.standings.idsByLeague,
  (byId, idsByLeague) => {
    return idsByLeague[leagueId]?.data === undefined
      ? undefined
      : idsByLeague[leagueId].data!
          .map(id => byId[id]?.data)
          .filter(isNotUndefined)
  },
)

export default selectStandingsByLeague
