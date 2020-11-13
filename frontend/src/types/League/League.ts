import { ILeagueFormat } from '../LeagueFormat'

export type ILeague = {
  id: string
  dateStart: string | undefined
  dateEnd: string | undefined
  format: ILeagueFormat
  playersMin: number
  playersMax: number | undefined
}
