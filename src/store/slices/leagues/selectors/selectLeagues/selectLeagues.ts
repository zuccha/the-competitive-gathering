import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../..'
import { ILeague } from '../../../../../types/League'
import { IRequest } from '../../../../../types/Request'
import isNotUndefined from '../../../../../utils/isNotUndefined'

const selectLeagues = createSelector<
  IStoreState,
  Record<string, IRequest<ILeague>>,
  IRequest<string[]>,
  ILeague[] | undefined
>(
  state => state.leagues.byId,
  state => state.leagues.ids,
  (byId, ids) => {
    return ids.data === undefined
      ? undefined
      : ids.data
          .map(id => byId[id]?.data)
          .filter(isNotUndefined)
  },
)

export default selectLeagues
