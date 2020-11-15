import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const registerMatchResult = createAsyncThunk<
  void,
  IMatch,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'matches/registerMatchResult',
  withErrorHttp(async match => {
    await api.put(`/matches/${match.id}`, {
      status: 'DONE',
      games_won_by_player1: match.results?.gamesWonByPlayer1,
      games_won_by_player2: match.results?.gamesWonByPlayer2,
      games_drew: match.results?.gamesDrew,
    })
  }),
)

export default registerMatchResult
