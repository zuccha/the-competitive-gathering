import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../types/Request'
import { ILeague } from '../../../types/League'
import fetchLeagues from './thunks/fetchLeagues'

export type ILeaguesState = IRequest<ILeague[]>

const initialState: ILeaguesState = Request.makeInitial()

const leagues = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLeagues.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchLeagues.rejected, () => {
      return Request.makeFailure()
    })
  },
})

export default leagues
