import { createSlice } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import Request, { IRequest } from '../../../../../types/Request'
import fetchLeagues from '../../thunks/fetchLeagues'

const byId = createSlice({
  name: 'leagues/byId',
  initialState: {} as Record<string, IRequest<ILeague>>,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLeagues.fulfilled, (state, action) => {
      action.payload.forEach(league => {
        state[league.id] = Request.makeSuccess(league)
      })
    })
  },
})

export default byId
