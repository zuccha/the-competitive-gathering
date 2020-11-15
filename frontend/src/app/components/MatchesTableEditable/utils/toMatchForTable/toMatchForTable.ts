import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatchForTable = (match: IMatch): IMatchForTable => ({
  id: match.id,
  leagueId: match.leagueId,
  player1: match.player1,
  player2: match.player2,
  gamesWonByPlayer1: match.results?.gamesWonByPlayer1,
  gamesWonByPlayer2: match.results?.gamesWonByPlayer2,
  gamesDrew: match.results?.gamesDrew,
  actions: ['register-result'],
})

export default toMatchForTable
