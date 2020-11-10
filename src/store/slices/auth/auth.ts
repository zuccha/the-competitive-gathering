import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../types/Request'
import login from './thunks/login'
import logout from './thunks/logout'

export type IAuthState = IRequest<{
  token: string | undefined
  username: string | undefined
}>

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
      return Request.makeSuccess({ username: undefined, token: undefined })
    })
    builder.addCase(logout.rejected, () => {
      return Request.makeFailure()
    })
  },
})

export default auth
