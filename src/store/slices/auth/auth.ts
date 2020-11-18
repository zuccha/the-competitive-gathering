import { createSlice } from '@reduxjs/toolkit'
import { ICredentials } from '../../../types/Credentials'
import Request, { IRequest } from '../../../types/Request'
import login from './thunks/login'
import logout from './thunks/logout'

export type IAuthState = IRequest<ICredentials | undefined>

const initialState: IAuthState = Request.makeInitial()

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Login
    builder.addCase(login.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(login.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload)
    })
    builder.addCase(login.rejected, () => {
      return Request.makeFailure()
    })

    // Logout
    builder.addCase(logout.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(logout.fulfilled, () => {
      return Request.makeSuccess(undefined)
    })
    builder.addCase(logout.rejected, () => {
      return Request.makeFailure()
    })
  },
})

export default auth
