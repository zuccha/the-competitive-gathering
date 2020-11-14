import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStoreDispatch, IStoreState } from '../../../../../..'
import ApiLeague from '../../../../../../../types/ApiLeague'
import { ILeague } from '../../../../../../../types/League'
import withErrorHttp from '../../../../../../../utils/withErrorHttp'
import api from '../../../../../../api'
import selectLeaguesStatus from '../../selectors/selectLeaguesStatus'

const fetchLeagues = createAsyncThunk<
  ILeague[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/ids/fetchLeagues',
  withErrorHttp(async () => {
    const { data } = await api.get('/leagues')
    return data.map(ApiLeague.toLeague)
  }),
  {
    condition: (args, { getState }) => {
      const status = selectLeaguesStatus(getState())
      return status !== 'loading'
    },
  },
)

export default fetchLeagues
