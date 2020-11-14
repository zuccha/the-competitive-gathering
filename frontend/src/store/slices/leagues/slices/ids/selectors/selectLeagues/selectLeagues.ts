import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { ILeague } from '../../../../../../../types/League'
import { IRequest } from '../../../../../../../types/Request'

const selectLeagues = createSelector<
  IStoreState,
  Record<string, ILeague>,
  IRequest<string[]>,
  ILeague[] | undefined
>(
  state => state.leagues.byId,
  state => state.leagues.ids,
  (byId, ids) => {
    return ids.data === undefined
      ? undefined
      : ids.data
          .map(id => byId[id])
          .filter(league => league !== undefined)
  },
)

export default selectLeagues
