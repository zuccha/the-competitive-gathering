import { createSlice } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import fetchMatches from '../ids/thunks/fetchMatches'
import fetchMatchesByLeague from '../idsByLeague/thunks/fetchMatchesByLeague'

const byId = createSlice({
  name: 'matches/byId',
  initialState: {} as Record<string, IMatch>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      action.payload.forEach(match => {
        state[match.id] = match
      })
    })
    builder.addCase(fetchMatchesByLeague.fulfilled, (state, action) => {
      action.payload.forEach(match => {
        state[match.id] = match
      })
    })
  },
})

export default byId
