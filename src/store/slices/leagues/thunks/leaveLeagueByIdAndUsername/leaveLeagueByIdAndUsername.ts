import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const leaveLeagueByIdAndUsername = createAsyncThunk<
  ILeague,
  { id: string, username: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/leaveLeagueByIdAndUsername',
  withErrorHttp(async ({ id, username }) => {
    const { data } = await api.delete(`leagues/${id}/players/${username}/`)
    return ApiLeague.toLeague(data)
  }),
)

export default leaveLeagueByIdAndUsername
