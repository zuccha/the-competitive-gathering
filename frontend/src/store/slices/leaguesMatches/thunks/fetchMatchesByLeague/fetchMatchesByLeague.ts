import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiMatch from '../../../../../types/ApiMatch'
import { IMatch } from '../../../../../types/Match'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectGetLeagueMatches from '../../selectors/selectGetLeagueMatches'

const fetchMatchesByLeague = createAsyncThunk<
  IMatch[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leaguesMatches/fetchMatchesByLeague',
  withErrorHttp(async id => {
    const { data } = await api.get('/matches', {
      params: { league_id: id },
    })
    return data.map(ApiMatch.toMatch)
  }),
  {
    condition: (id, { getState }) => {
      const leagueMatches = selectGetLeagueMatches(getState())(id)
      return leagueMatches.status !== 'loading'
    },
  },
)

export default fetchMatchesByLeague
