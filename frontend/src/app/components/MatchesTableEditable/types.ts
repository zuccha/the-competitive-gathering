export type IAction = 'register-result'

export type IMatchForTable = {
  id: string
  username1: string
  username2: string
  gamesWonByUsername1: number | undefined
  gamesWonByUsername2: number | undefined
  gamesDrew: number | undefined
  actions: IAction[]
}
