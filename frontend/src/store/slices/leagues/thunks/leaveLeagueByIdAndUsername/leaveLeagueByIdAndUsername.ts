import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const leaveLeagueByIdAndUsername = createAsyncThunk<
  void,
  { id: string, username: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/leaveLeagueByIdAndUsername',
  withErrorHttp(async ({ id, username }) => {
    await api.delete(`/leagues/${id}/players/${username}`)
  }),
)

export default leaveLeagueByIdAndUsername
