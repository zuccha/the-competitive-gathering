import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../../../types/Request'
import registerMatchResult from '../../thunks/registerMatchResult'
import fetchMatchesByLeague from './thunks/fetchMatchesByLeague'

const idsByLeague = createSlice({
  name: 'matches/idsByLeague',
  initialState: {} as Record<string, IRequest<string[]>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMatchesByLeague.pending, (state, action) => {
      state[action.meta.arg] = Request.makeInitial()
    })
    builder.addCase(fetchMatchesByLeague.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload.map(match => match.id))
    })
    builder.addCase(fetchMatchesByLeague.rejected, (state, action) => {
      state[action.meta.arg] = Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, (state, action) => {
      state[action.meta.arg.leagueId] = Request.makeInitial()
    })
  },
})

export default idsByLeague
