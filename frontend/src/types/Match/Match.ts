export type IMatch = {
  id: string
  username1: string | undefined
  username2: string | undefined
  results: {
    gamesWonByUsername1: number
    gamesWonByUsername2: number
    gamesDrew: number
  } | undefined
}

const Match = {
  canEdit: (match: IMatch, username: string): boolean => {
    const isUserMatch = match.username1 === username || match.username2 === username
    const isMatchDone = match.results !== undefined
    return isUserMatch && !isMatchDone
  },
}

export default Match
