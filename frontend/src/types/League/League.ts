import { ILeagueFormat } from '../LeagueFormat'
import { ILeagueStatus } from '../LeagueStatus'

export type ILeague = {
  id: string
  creator: string | undefined
  players: string[]
  status: ILeagueStatus
  format: ILeagueFormat
  dateStart: string | undefined
  dateEnd: string | undefined
  playersMin: number
  playersMax: number | undefined
  rounds: number
}
