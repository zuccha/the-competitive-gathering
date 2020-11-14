import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectMatchesStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.matches.ids,
  ids => ids.status,
)

export default selectMatchesStatus
