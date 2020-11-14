import { ILeagueFormat } from '../LeagueFormat'

export type IApiLeagueInput = {
  creator: string | undefined
  players: string[]
  format: ILeagueFormat
  players_min: number
  players_max: number | undefined
  rounds: number
}
