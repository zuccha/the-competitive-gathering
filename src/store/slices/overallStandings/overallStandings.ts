import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../types/Request'
import { IStanding } from '../../../types/Standing'
import fetchOverallStandings from './thunks/fetchOverallStandings'

export type IOverallStandingsState = IRequest<IStanding[]>

const initialState: IOverallStandingsState = Request.makeInitial()

const overallStandings = createSlice({
  name: 'overallStandings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOverallStandings.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchOverallStandings.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchOverallStandings.rejected, () => {
      return Request.makeFailure()
    })
  },
})

export default overallStandings
