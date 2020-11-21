import { ILeagueFormat } from '../LeagueFormat'

export type IApiLeagueInput = {
  name: string
  creator: string | undefined
  players: string[]
  format: ILeagueFormat
  players_min: number
  players_max: number | undefined
  rounds: number
}
