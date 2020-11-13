import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import { ILeagueFormat } from '../../../../../types/LeagueFormat'
import { ILeagueStatus } from '../../../../../types/LeagueStatus'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectLeagues from '../../selectors/selectLeagues'

type ILeagueApi = {
  id: number
  creator: string | null
  players: string[]
  status: ILeagueStatus
  format: ILeagueFormat
  date_start: string | null
  date_end: string | null
  players_min: number
  players_max: number | null
  rounds: number
}

const fetchLeagues = createAsyncThunk<
  ILeague[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/fetchLeagues',
  withErrorHttp(async () => {
    const { data } = await api.get('/leagues')
    return data.map((league: ILeagueApi): ILeague => ({
      id: `${league.id}`,
      format: league.format,
      dateStart: league.date_start || undefined,
      dateEnd: league.date_end || undefined,
      playersMin: league.players_min,
      playersMax: league.players_max || undefined,
    }))
  }),
  {
    condition: (args, { getState }) => {
      const leagues = selectLeagues(getState())
      return leagues.status !== 'loading'
    },
  },
)

export default fetchLeagues
