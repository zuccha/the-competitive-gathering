import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IMatch } from '../../../../../../../types/Match'
import { IRequest } from '../../../../../../../types/Request'

const selectMatches = createSelector<
  IStoreState,
  Record<string, IMatch>,
  IRequest<string[]>,
  IMatch[] | undefined
>(
  state => state.matches.byId,
  state => state.matches.ids,
  (byId, ids) => {
    return ids.data === undefined
      ? undefined
      : ids.data
          .map(id => byId[id])
          .filter(match => match !== undefined)
  },
)

export default selectMatches
