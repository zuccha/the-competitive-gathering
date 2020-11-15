import { IMatch } from '../Match'
import { IMatchStatus } from '../MatchStatus'

export type IApiMatch = {
  id: number,
  league: number,
  player1: string | null,
  player2: string | null,
  status: IMatchStatus,
  games_won_by_player1: number | null,
  games_won_by_player2: number | null,
  games_drew: number | null,
}

const ApiMatch = {
  toMatch: (apiMatch: IApiMatch): IMatch => ({
    id: `${apiMatch.id}`,
    leagueId: `${apiMatch.league}`,
    player1: apiMatch.player1 || undefined,
    player2: apiMatch.player2 || undefined,
    results: apiMatch.status === 'DONE'
      ? {
        gamesWonByPlayer1: apiMatch.games_won_by_player1 || 0,
        gamesWonByPlayer2: apiMatch.games_won_by_player2 || 0,
        gamesDrew: apiMatch.games_drew || 0,
      }
      : undefined,
  }),
}

export default ApiMatch
