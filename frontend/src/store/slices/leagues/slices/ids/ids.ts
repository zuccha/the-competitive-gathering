import { createSlice } from '@reduxjs/toolkit'
import Request from '../../../../../types/Request'
import createLeague from '../../thunks/createLeague'
import fetchLeagues from './thunks/fetchLeagues'

const ids = createSlice({
  name: 'leagues/ids',
  initialState: Request.makeInitial<string[]>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLeagues.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload.map(league => league.id))
    })
    builder.addCase(fetchLeagues.rejected, () => {
      return Request.makeFailure()
    })
    builder.addCase(createLeague.fulfilled, () => {
      return Request.makeInitial()
    })
  },
})

export default ids
