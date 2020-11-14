import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectLeagues from '../../selectors/selectLeagues'

const fetchLeagues = createAsyncThunk<
  ILeague[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/fetchLeagues',
  withErrorHttp(async () => {
    const { data } = await api.get('/leagues')
    return data.map(ApiLeague.toLeague)
  }),
  {
    condition: (args, { getState }) => {
      const leagues = selectLeagues(getState())
      return leagues.status !== 'loading'
    },
  },
)

export default fetchLeagues
