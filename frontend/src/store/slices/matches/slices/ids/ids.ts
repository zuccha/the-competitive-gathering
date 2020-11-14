import { createSlice } from '@reduxjs/toolkit'
import Request from '../../../../../types/Request'
import registerMatchResult from '../../thunks/registerMatchResult'
import fetchMatches from '../../thunks/fetchMatches'

const ids = createSlice({
  name: 'matches/ids',
  initialState: Request.makeInitial<string[]>(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMatches.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload.map(match => match.id))
    })
    builder.addCase(fetchMatches.rejected, () => {
      return Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, () => {
      return Request.makeInitial()
    })
  },
})

export default ids
