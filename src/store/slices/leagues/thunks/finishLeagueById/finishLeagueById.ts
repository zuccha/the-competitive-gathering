import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const finishLeagueById = createAsyncThunk<
  ILeague,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/finishLeagueById',
  withErrorHttp(async id => {
    const { data } = await api.put(`/leagues/${id}/status`, {
      status: 'DONE',
    })
    return ApiLeague.toLeague(data)
  }),
)

export default finishLeagueById
