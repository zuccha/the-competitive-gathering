import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const startLeagueById = createAsyncThunk<
  ILeague,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/startLeagueById',
  withErrorHttp(async id => {
    const { data } = await api.put(`/leagues/${id}/status/`, {
      status: 'ONGOING',
    })
    return ApiLeague.toLeague(data)
  }),
)

export default startLeagueById
