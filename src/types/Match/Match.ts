export type IMatch = {
  id: string
  username1: string
  username2: string
  results: {
    gamesWonByUsername1: number
    gamesWonByUsername2: number
    gamesDraw: number
  } | undefined
}

const Match = {
  canEdit: (match: IMatch, username: string): boolean => {
    return match.username1 === username || match.username2 === username
  },
}

export default Match
