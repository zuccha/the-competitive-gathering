import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiStanding from '../../../../../types/ApiStanding'
import { IStanding } from '../../../../../types/Standing'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectOverallStandings from '../../selectors/selectOverallStandings'

const fetchOverallStandings = createAsyncThunk<
  IStanding[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'overallStandings/fetchOverallStandings',
  withErrorHttp(async () => {
    const { data } = await api.get('/standings')
    return data.map(ApiStanding.toStanding)
  }),
  {
    condition: (args, { getState }) => {
      const overallStandings = selectOverallStandings(getState())
      return overallStandings.status !== 'loading'
    },
  },
)

export default fetchOverallStandings
