export type IAction = 'register-result'

export type IMatchForTable = {
  id: string
  leagueId: string
  player1: string | undefined
  player2: string | undefined
  gamesWonByPlayer1: number | undefined
  gamesWonByPlayer2: number | undefined
  gamesDrew: number | undefined
  actions: IAction[]
}
