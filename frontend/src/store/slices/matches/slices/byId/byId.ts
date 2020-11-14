import { createSlice } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import Request, { IRequest } from '../../../../../types/Request'
import fetchMatches from '../../thunks/fetchMatches'
import fetchMatchesByLeague from '../../thunks/fetchMatchesByLeague'

const byId = createSlice({
  name: 'matches/byId',
  initialState: {} as Record<string, IRequest<IMatch>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      action.payload.forEach(match => {
        state[match.id] = Request.makeSuccess(match)
      })
    })
    builder.addCase(fetchMatchesByLeague.fulfilled, (state, action) => {
      action.payload.forEach(match => {
        state[match.id] = Request.makeSuccess(match)
      })
    })
  },
})

export default byId
