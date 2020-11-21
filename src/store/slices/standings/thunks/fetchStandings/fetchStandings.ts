import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiStanding from '../../../../../types/ApiStanding'
import { IStanding } from '../../../../../types/Standing'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectStandingsStatus from '../../selectors/selectStandingsStatus'

const fetchStandings = createAsyncThunk<
  IStanding[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'standings/fetchStandings',
  withErrorHttp(async () => {
    const { data } = await api.get('standings/')
    return data.map(ApiStanding.toStanding)
  }),
  {
    condition: (args, { getState }) => {
      const status = selectStandingsStatus(getState())
      return status !== 'loading'
    },
  },
)

export default fetchStandings
