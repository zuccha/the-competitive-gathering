import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const deleteLeagueById = createAsyncThunk<
  void,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/deleteLeagueById',
  withErrorHttp(async id => {
    await api.delete(`leagues/${id}/`)
  }),
)

export default deleteLeagueById
