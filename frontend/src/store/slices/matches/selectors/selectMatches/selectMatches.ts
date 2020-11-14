import { createSelector } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import { IRequest } from '../../../../../types/Request'
import isNotUndefined from '../../../../../utils/isNotUndefined'
import { IStoreState } from '../../../../store'

const selectMatches = createSelector<
  IStoreState,
  Record<string, IRequest<IMatch>>,
  IRequest<string[]>,
  IMatch[] | undefined
>(
  state => state.matches.byId,
  state => state.matches.ids,
  (byId, ids) => {
    return ids.data === undefined
      ? undefined
      : ids.data
          .map(id => byId[id]?.data)
          .filter(isNotUndefined)
  },
)

export default selectMatches
