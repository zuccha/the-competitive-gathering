import { IMatchStatus } from '../MatchStatus'

export type IMatch = {
  id: string
  leagueId: string
  status: IMatchStatus
  player1: string | undefined
  player2: string | undefined
  round: number
  gamesWonByPlayer1: number | undefined
  gamesWonByPlayer2: number | undefined
  gamesDrew: number | undefined
}

const Match = {
  canEdit: (match: IMatch, player: string): boolean => {
    const isUserMatch = match.player1 === player || match.player2 === player
    return isUserMatch && match.status === 'PENDING'
  },
}

export default Match
