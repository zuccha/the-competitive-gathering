import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStanding } from '../../../../../types/Standing'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectGetLeagueStandings from '../../selectors/selectGetLeagueStandings'
import api from '../../../../api'
import ApiStanding from '../../../../../types/ApiStanding'
import withErrorHttp from '../../../../../utils/withErrorHttp'

const fetchStandingsByLeague = createAsyncThunk<
  IStanding[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leaguesStandings/fetchStandingsByLeague',
  withErrorHttp(async id => {
    const { data } = await api.get('/standings', {
      params: { league_id: id },
    })
    return data.map(ApiStanding.toStanding)
  }),
  {
    condition: (id, { getState }) => {
      const leagueStandings = selectGetLeagueStandings(getState())(id)
      return leagueStandings.status !== 'loading'
    },
  },
)

export default fetchStandingsByLeague
