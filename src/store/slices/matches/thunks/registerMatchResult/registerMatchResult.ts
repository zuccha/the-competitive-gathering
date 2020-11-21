import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiMatch from '../../../../../types/ApiMatch'
import { IMatch } from '../../../../../types/Match'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const registerMatchResult = createAsyncThunk<
  IMatch,
  IMatch,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'matches/registerMatchResult',
  withErrorHttp(async match => {
    const { data } = await api.put(`/matches/${match.id}/`, {
      status: 'DONE',
      games_won_by_player1: match.gamesWonByPlayer1,
      games_won_by_player2: match.gamesWonByPlayer2,
      games_drew: match.gamesDrew,
    })
    return ApiMatch.toMatch(data)
  }),
)

export default registerMatchResult
