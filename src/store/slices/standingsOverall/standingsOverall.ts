import { createSlice } from '@reduxjs/toolkit'
import Request, { IRequest } from '../../../types/Request'
import { IStanding } from '../../../types/Standing'
import fetchStandingsOverall from './thunks/fetchStandingsOverall'

export type IStandingsOverallState = IRequest<IStanding[]>

const initialState: IStandingsOverallState = Request.makeInitial()

const standingsOverall = createSlice({
  name: 'standingsOverall',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStandingsOverall.pending, () => {
      return Request.makeLoading()
    })
    builder.addCase(fetchStandingsOverall.fulfilled, (state, action) => {
      return Request.makeSuccess(action.payload)
    })
    builder.addCase(fetchStandingsOverall.rejected, () => {
      return Request.makeFailure()
    })
  },
})

export default standingsOverall
