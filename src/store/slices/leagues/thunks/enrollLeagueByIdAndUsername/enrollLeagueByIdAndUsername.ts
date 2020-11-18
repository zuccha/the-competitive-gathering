import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const enrollLeagueByIdAndUsername = createAsyncThunk<
  ILeague,
  { id: string, username: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/enrollLeagueByIdAndUsername',
  withErrorHttp(async ({ id, username }) => {
    const { data } = await api.put(`/leagues/${id}/players/${username}`)
    return ApiLeague.toLeague(data)
  }),
)

export default enrollLeagueByIdAndUsername
