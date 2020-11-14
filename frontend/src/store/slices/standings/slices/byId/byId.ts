import { createSlice } from '@reduxjs/toolkit'
import { IStanding } from '../../../../../types/Standing'
import fetchStandings from '../ids/thunks/fetchStandings'
import fetchStandingsByLeague from '../idsByLeague/thunks/fetchStandingsByLeague'

const byId = createSlice({
  name: 'standings/byId',
  initialState: {} as Record<string, IStanding>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandings.fulfilled, (state, action) => {
      action.payload.forEach(standing => {
        state[standing.username] = standing
      })
    })
    builder.addCase(fetchStandingsByLeague.fulfilled, (state, action) => {
      action.payload.forEach(standing => {
        state[standing.username] = standing
      })
    })
  },
})

export default byId
