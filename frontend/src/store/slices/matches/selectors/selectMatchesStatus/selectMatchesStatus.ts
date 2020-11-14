import { createSelector } from '@reduxjs/toolkit'
import { IRequest } from '../../../../../types/Request'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'

const selectMatchesStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.matches.ids,
  ids => ids.status,
)

export default selectMatchesStatus
