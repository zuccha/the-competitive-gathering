import { createSlice } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import fetchLeagues from '../ids/thunks/fetchLeagues'

const byId = createSlice({
  name: 'leagues/byId',
  initialState: {} as Record<string, ILeague>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      action.payload.forEach(league => {
        state[league.id] = league
      })
    })
  },
})

export default byId
