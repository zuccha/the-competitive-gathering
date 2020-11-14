import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IStanding } from '../../../../../../../types/Standing'
import isNotUndefined from '../../../../../../../utils/isNotUndefined'

const selectStandings = createSelector<
  IStoreState,
  Record<string, IRequest<IStanding>>,
  IRequest<string[]>,
  IStanding[] | undefined
>(
  state => state.standings.byId,
  state => state.standings.ids,
  (byId, ids) => {
    return ids.data === undefined
      ? undefined
      : ids.data
        .map(id => byId[id]?.data)
        .filter(isNotUndefined)
  },
)

export default selectStandings
