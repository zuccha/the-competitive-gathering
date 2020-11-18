import { createSelector } from '@reduxjs/toolkit'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'
import { IAuthState } from '../../auth'

const selectAuthStatus = createSelector<IStoreState, IAuthState, IRequestStatus>(
  state => state.auth,
  auth => auth.status,
)

export default selectAuthStatus
