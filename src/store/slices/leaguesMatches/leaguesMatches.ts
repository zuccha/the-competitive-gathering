import { createSlice } from '@reduxjs/toolkit'
import { IMatch } from '../../../types/Match'
import Request, { IRequest } from '../../../types/Request'
import fetchMatchesByLeague from './thunks/fetchMatchesByLeague'

export type ILeaguesMatchesState = Record<string, IRequest<IMatch[]>>

const initialState: ILeaguesMatchesState = {}

const leaguesStandings = createSlice({
  name: 'leaguesMatches',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMatchesByLeague.pending, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeLoading()
    })
    builder.addCase(fetchMatchesByLeague.fulfilled, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchMatchesByLeague.rejected, (state, action) => {
      const id = action.meta.arg
      state[id] = Request.makeFailure()
    })
  },
})

export default leaguesStandings
