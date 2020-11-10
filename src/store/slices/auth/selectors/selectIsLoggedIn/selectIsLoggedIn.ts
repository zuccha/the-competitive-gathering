import { createSelector } from '@reduxjs/toolkit'
import { IRootState } from '../../../../store'
import { IAuthState } from '../../auth'

const selectIsLoggedIn = createSelector<IRootState, IAuthState, boolean>(
  state => state.auth,
  auth => Boolean(auth.token),
)

export default selectIsLoggedIn
