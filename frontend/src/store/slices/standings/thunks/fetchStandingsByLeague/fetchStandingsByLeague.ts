import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiStanding from '../../../../../types/ApiStanding'
import { IStanding } from '../../../../../types/Standing'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectStandingsStatusByLeague from '../../selectors/selectStandingsStatusByLeague'

const fetchStandingsByLeague = createAsyncThunk<
  IStanding[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'standings/fetchStandingsByLeague',
  withErrorHttp(async leagueId => {
    const { data } = await api.get('/standings', {
      params: { league_id: leagueId },
    })
    return data.map(ApiStanding.toStanding)
  }),
  {
    condition: (leagueId, { getState }) => {
      const status = selectStandingsStatusByLeague(leagueId)(getState())
      return status !== 'loading'
    },
  },
)

export default fetchStandingsByLeague
