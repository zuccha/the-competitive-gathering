import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../types/Request'
import { IStanding } from '../../../types/Standing'
import { registerMatchResult } from '../leaguesMatches'
import fetchStandingsByLeague from './thunks/fetchStandingsByLeague'

export type ILeaguesStandingsState = Record<string, IRequest<IStanding[]>>

const initialState: ILeaguesStandingsState = {}

const leaguesStandings = createSlice({
  name: 'leaguesStandings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandingsByLeague.pending, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeLoading()
    })
    builder.addCase(fetchStandingsByLeague.fulfilled, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchStandingsByLeague.rejected, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeFailure()
    })
    builder.addCase(registerMatchResult.fulfilled, (state, action) => {
      const id = action.meta.arg.leagueId
      state[id] = Request.makeInitial()
    })
  },
})

export default leaguesStandings
