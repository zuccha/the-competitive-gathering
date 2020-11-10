import { createSelector } from '@reduxjs/toolkit'
import { IStoreState } from '../../../../store'
import { IAuthState } from '../../auth'

const selectIsLoggedIn = createSelector<IStoreState, IAuthState, boolean>(
  state => state.auth,
  auth => Boolean(auth.data?.token),
)

export default selectIsLoggedIn
