import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../../../types/Request'
import { registerMatchResult } from '../../../matches'
import fetchStandingsByLeague from './thunks/fetchStandingsByLeague'

const idsByLeague = createSlice({
  name: 'standings/idsByLeague',
  initialState: {} as Record<string, IRequest<string[]>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandingsByLeague.pending, (state, action) => {
      state[action.meta.arg] = Request.makeInitial()
    })
    builder.addCase(fetchStandingsByLeague.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload.map(standing => standing.username))
    })
    builder.addCase(fetchStandingsByLeague.rejected, (state, action) => {
      state[action.meta.arg] = Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, (state, action) => {
      state[action.meta.arg.leagueId] = Request.makeInitial()
    })
  },
})

export default idsByLeague
