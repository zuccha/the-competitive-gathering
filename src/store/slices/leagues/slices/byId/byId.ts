import { createSlice } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import Request, { IRequest } from '../../../../../types/Request'
import cancelLeagueById from '../../thunks/cancelLeagueById'
import deleteLeagueById from '../../thunks/deleteLeagueById'
import enrollLeagueByIdAndUsername from '../../thunks/enrollLeagueByIdAndUsername'
import fetchLeagueById from '../../thunks/fetchLeagueById'
import fetchLeagues from '../../thunks/fetchLeagues'
import finishLeagueById from '../../thunks/finishLeagueById'
import leaveLeagueByIdAndUsername from '../../thunks/leaveLeagueByIdAndUsername'
import startLeagueById from '../../thunks/startLeagueById'

const byId = createSlice({
  name: 'leagues/byId',
  initialState: {} as Record<string, IRequest<ILeague>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLeagueById.pending, (state, action) => {
      state[action.meta.arg] = Request.makeLoading()
    })
    builder.addCase(fetchLeagueById.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchLeagueById.rejected, (state, action) => {
      state[action.meta.arg] = Request.makeFailure()
    })
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      action.payload.forEach(league => {
        state[league.id] = Request.makeSuccess(league)
      })
    })
    builder.addCase(deleteLeagueById.fulfilled, (state, action) => {
      delete state[action.meta.arg]
    })
    builder.addCase(enrollLeagueByIdAndUsername.fulfilled, (state, action) => {
      state[action.meta.arg.id] = Request.makeSuccess(action.payload)
    })
    builder.addCase(leaveLeagueByIdAndUsername.fulfilled, (state, action) => {
      state[action.meta.arg.id] = Request.makeSuccess(action.payload)
    })
    builder.addCase(startLeagueById.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload)
    })
    builder.addCase(finishLeagueById.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeSuccess(action.payload)
    })
    builder.addCase(cancelLeagueById.fulfilled, (state, action) => {
      state[action.meta.arg] = Request.makeInitial()
    })
  },
})

export default byId
