import { IMatch } from '../Match'
import { IMatchStatus } from '../MatchStatus'

export type IApiMatch = {
  id: number
  league: number
  player1: string | null
  player2: string | null
  status: IMatchStatus
  round: number
  games_won_by_player1: number | null
  games_won_by_player2: number | null
  games_drew: number | null
}

const ApiMatch = {
  toMatch: (apiMatch: IApiMatch): IMatch => ({
    id: `${apiMatch.id}`,
    leagueId: `${apiMatch.league}`,
    status: apiMatch.status,
    player1: apiMatch.player1 || undefined,
    player2: apiMatch.player2 || undefined,
    round: apiMatch.round,
    gamesWonByPlayer1: apiMatch.games_won_by_player1 ?? undefined,
    gamesWonByPlayer2: apiMatch.games_won_by_player2 ?? undefined,
    gamesDrew: apiMatch.games_drew ?? undefined,
  }),
}

export default ApiMatch
