import { createSlice } from '@reduxjs/toolkit'
import Request from '../../../../../types/Request'
import { registerMatchResult } from '../../../matches'
import fetchStandings from '../../thunks/fetchStandings'

const ids = createSlice({
  name: 'standings/ids',
  initialState: Request.makeInitial<string[]>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandings.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchStandings.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload.map(standing => standing.username))
    })
    builder.addCase(fetchStandings.rejected, () => {
      return Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, () => {
      return Request.makeInitial()
    })
  },
})

export default ids
