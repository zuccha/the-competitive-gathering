import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../../../types/Request'
import { IStanding } from '../../../../../types/Standing'
import fetchStandings from '../../thunks/fetchStandings'
import fetchStandingsByLeague from '../../thunks/fetchStandingsByLeague'

const byId = createSlice({
  name: 'standings/byId',
  initialState: {} as Record<string, IRequest<IStanding>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandings.fulfilled, (state, action) => {
      action.payload.forEach(standing => {
        state[standing.username] = Request.makeSuccess(standing)
      })
    })
    builder.addCase(fetchStandingsByLeague.fulfilled, (state, action) => {
      action.payload.forEach(standing => {
        state[`${standing.username}/l${action.meta.arg}`] = Request.makeSuccess(standing)
      })
    })
  },
})

export default byId
