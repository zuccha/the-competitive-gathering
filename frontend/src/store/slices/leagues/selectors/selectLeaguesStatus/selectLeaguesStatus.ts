import { createSelector } from '@reduxjs/toolkit'
import { IRequest } from '../../../../../types/Request'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'

const selectLeaguesStatus = createSelector<
  IStoreState,
  IRequest<string[]>,
  IRequestStatus
>(
  state => state.leagues.ids,
  ids => ids.status,
)

export default selectLeaguesStatus
