import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectLeagueStatusById from '../../selectors/selectLeagueStatusById'

const fetchLeagueById = createAsyncThunk<
  ILeague,
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/fetchLeagueById',
  withErrorHttp(async id => {
    const { data } = await api.get(`/leagues/${id}/`)
    return ApiLeague.toLeague(data)
  }),
  {
    condition: (id, { getState }) => {
      const status = selectLeagueStatusById(id)(getState())
      return status !== 'loading'
    },
  },
)

export default fetchLeagueById
