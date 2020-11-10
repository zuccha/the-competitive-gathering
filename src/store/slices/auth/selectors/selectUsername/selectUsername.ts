import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../store'
import { IAuthState } from '../../auth'

const selectUsername = createSelector<IStoreState, IAuthState, string | undefined>(
  state => state.auth,
  auth => auth.data?.username,
)

export default selectUsername
