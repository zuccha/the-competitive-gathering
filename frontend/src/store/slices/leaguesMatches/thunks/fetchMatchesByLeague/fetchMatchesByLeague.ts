import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import { IMatchStatus } from '../../../../../types/MatchStatus'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectGetLeagueMatches from '../../selectors/selectGetLeagueMatches'

type IMatchApi = {
  id: number,
  league: number,
  player1: string | null,
  player2: string | null,
  status: IMatchStatus,
  games_won_by_player1: number | null,
  games_won_by_player2: number | null,
  games_drew: number | null,
}

const fetchMatchesByLeague = createAsyncThunk<
  IMatch[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leaguesMatches/fetchMatchesByLeague',
  withErrorHttp(async id => {
    const { data } = await api.get(`/matches/${id}`)
    return data.map((matchApi: IMatchApi): IMatch => ({
      id: `${matchApi.id}`,
      username1: matchApi.player1 || 'unknown',
      username2: matchApi.player2 || 'unknown',
      results: matchApi.status === 'DONE'
        ? {
          gamesWonByUsername1: matchApi.games_won_by_player1 || 0,
          gamesWonByUsername2: matchApi.games_won_by_player2 || 0,
          gamesDrew: matchApi.games_drew || 0,
        }
        : undefined,
    }))
  }),
  {
    condition: (id, { getState }) => {
      const leagueMatches = selectGetLeagueMatches(getState())(id)
      return leagueMatches.status !== 'loading'
    },
  },
)

export default fetchMatchesByLeague
