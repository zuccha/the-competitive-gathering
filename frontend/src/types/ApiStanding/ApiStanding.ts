import { IStanding } from '../Standing'

export type IApiStanding = {
  username: string
  points: number
  matches_played: number
  matches_won: number
  matches_lost: number
  matches_drew: number
  games_played: number
  games_won: number
  games_lost: number
  games_drew: number
}

const ApiStanding = {
  toStanding: (apiStanding: IApiStanding): IStanding => ({
    username: apiStanding.username,
    points: apiStanding.points,
    matchesPlayed: apiStanding.matches_played,
    matchesWon: apiStanding.matches_won,
    matchesLost: apiStanding.matches_lost,
    matchesDraw: apiStanding.matches_drew,
    gamesPlayed: apiStanding.games_played,
    gamesWon: apiStanding.games_won,
    gamesLost: apiStanding.games_lost,
    gamesDrew: apiStanding.games_drew,
  }),
}

export default ApiStanding
