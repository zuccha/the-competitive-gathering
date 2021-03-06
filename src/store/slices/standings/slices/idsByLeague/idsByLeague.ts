import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../../../types/Request'
import { enrollLeagueByIdAndUsername, leaveLeagueByIdAndUsername } from '../../../leagues'
import { registerMatchResult } from '../../../matches'
import fetchStandingsByLeague from '../../thunks/fetchStandingsByLeague'

const idsByLeague = createSlice({
  name: 'standings/idsByLeague',
  initialState: {} as Record<string, IRequest<string[]>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandingsByLeague.pending, (state, action) => {
      state[action.meta.arg] = Request.makeInitial()
    })
    builder.addCase(fetchStandingsByLeague.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload.map(standing => `${standing.username}/l${action.meta.arg}`))
    })
    builder.addCase(fetchStandingsByLeague.rejected, (state, action) => {
      state[action.meta.arg] = Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, (state, action) => {
      state[action.meta.arg.leagueId] = Request.makeInitial()
    })
    builder.addCase(enrollLeagueByIdAndUsername.fulfilled, (state, action) => {
      state[action.meta.arg.id] = Request.makeInitial()
    })
    builder.addCase(leaveLeagueByIdAndUsername.fulfilled, (state, action) => {
      state[action.meta.arg.id] = Request.makeInitial()
    })
  },
})

export default idsByLeague
