import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatch = (matchForTable: IMatchForTable): IMatch => ({
  id: matchForTable.id,
  leagueId: matchForTable.leagueId,
  player1: matchForTable.player1,
  player2: matchForTable.player2,
  results: matchForTable.gamesDrew === undefined
    ? undefined
    : {
      gamesWonByPlayer1: matchForTable.gamesWonByPlayer1 || 0,
      gamesWonByPlayer2: matchForTable.gamesWonByPlayer2 || 0,
      gamesDrew: matchForTable.gamesDrew || 0,
    },
})

export default toMatch
