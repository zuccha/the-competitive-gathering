import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiMatch from '../../../../../types/ApiMatch'
import { IMatch } from '../../../../../types/Match'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectMatchesStatusByLeague from '../../selectors/selectMatchesStatusByLeague'

const fetchMatchesByLeague = createAsyncThunk<
  IMatch[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'matches/fetchMatchesByLeague',
  withErrorHttp(async leagueId => {
    const { data } = await api.get('/matches/', {
      params: { league_id: leagueId },
    })
    return data.map(ApiMatch.toMatch)
  }),
  {
    condition: (leagueId, { getState }) => {
      const status = selectMatchesStatusByLeague(leagueId)(getState())
      return status !== 'loading'
    },
  },
)

export default fetchMatchesByLeague
