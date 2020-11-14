import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../../..'
import { IRequest } from '../../../../../../../types/Request'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectLeaguesStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.leagues.ids,
  ids => ids.status,
)

export default selectLeaguesStatus
