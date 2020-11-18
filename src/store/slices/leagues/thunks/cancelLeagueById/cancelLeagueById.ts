import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const cancelLeagueById = createAsyncThunk<
  void,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/cancelLeagueById',
  withErrorHttp(async id => {
    await api.put(`/leagues/${id}/status`, {
      status: 'CANCELED',
    })
  }),
)

export default cancelLeagueById
