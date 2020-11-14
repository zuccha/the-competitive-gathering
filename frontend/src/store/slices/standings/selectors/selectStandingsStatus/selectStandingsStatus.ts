import { createSelector } from '@reduxjs/toolkit'
import { IRequest } from '../../../../../types/Request'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'

const selectStandingsStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.standings.ids,
  ids => ids.status,
)

export default selectStandingsStatus
