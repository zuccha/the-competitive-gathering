import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IMatch } from '../../../../../../../types/Match'
import { IRequest } from '../../../../../../../types/Request'
import isNotUndefined from '../../../../../../../utils/isNotUndefined'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectMatchesByLeague = (leagueId: string) => createSelector<
  IStoreState,
  Record<string, IRequest<IMatch>>,
  Record<string, IRequest<string[]>>,
  IMatch[] | undefined
>(
  state => state.matches.byId,
  state => state.matches.idsByLeague,
  (byId, idsByLeague) => {
    return idsByLeague[leagueId]?.data === undefined
      ? undefined
      : idsByLeague[leagueId].data!
          .map(id => byId[id]?.data)
          .filter(isNotUndefined)
  },
)

export default selectMatchesByLeague
