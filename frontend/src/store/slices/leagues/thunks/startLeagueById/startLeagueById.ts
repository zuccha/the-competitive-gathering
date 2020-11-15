import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const startLeagueById = createAsyncThunk<
  void,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/startLeagueById',
  withErrorHttp(async id => {
    await api.put(`/leagues/${id}/status`, {
      status: 'ONGOING',
    })
  }),
)

export default startLeagueById
