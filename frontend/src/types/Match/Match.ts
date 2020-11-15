export type IMatch = {
  id: string
  leagueId: string
  player1: string | undefined
  player2: string | undefined
  results: {
    gamesWonByPlayer1: number
    gamesWonByPlayer2: number
    gamesDrew: number
  } | undefined
}

const Match = {
  canEdit: (match: IMatch, player: string): boolean => {
    const isUserMatch = match.player1 === player || match.player2 === player
    const isMatchDone = match.results !== undefined
    return isUserMatch && !isMatchDone
  },
}

export default Match
