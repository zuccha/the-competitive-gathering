import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectStandingsStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.standings.ids,
  ids => ids.status,
)

export default selectStandingsStatus
