import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const enrollLeagueByIdAndUsername = createAsyncThunk<
  void,
  { id: string, username: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/enrollLeagueByIdAndUsername',
  withErrorHttp(async ({ id, username }) => {
    await api.put(`/leagues/${id}/players/${username}`)
  }),
)

export default enrollLeagueByIdAndUsername
