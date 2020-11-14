import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStanding } from '../../../../../types/Standing'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectOverallStandings from '../../selectors/selectOverallStandings'

type IStandingApi = {
  username: string,
  points: number,
  matches_played: number,
  matches_won: number,
  matches_lost: number,
  matches_drew: number,
  games_played: number,
  games_won: number,
  games_lost: number,
  games_drew: number,
}

const fetchOverallStandings = createAsyncThunk<
  IStanding[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'overallStandings/fetchOverallStandings',
  withErrorHttp(async () => {
    const { data } = await api.get('/standings')
    return data.map((standingApi: IStandingApi): IStanding => ({
      username: standingApi.username,
      points: standingApi.points,
      matchesPlayed: standingApi.matches_played,
      matchesWon: standingApi.matches_won,
      matchesLost: standingApi.matches_lost,
      matchesDraw: standingApi.matches_drew,
      gamesPlayed: standingApi.games_played,
      gamesWon: standingApi.games_won,
      gamesLost: standingApi.games_lost,
      gamesDrew: standingApi.games_drew,
    }))
  }),
  {
    condition: (args, { getState }) => {
      const overallStandings = selectOverallStandings(getState())
      return overallStandings.status !== 'loading'
    },
  },
)

export default fetchOverallStandings
