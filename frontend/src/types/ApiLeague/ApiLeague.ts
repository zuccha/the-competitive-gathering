import { ILeague } from '../League'
import { ILeagueFormat } from '../LeagueFormat'
import { ILeagueStatus } from '../LeagueStatus'

export type IApiLeague = {
  id: number
  creator: string | null
  players: string[]
  status: ILeagueStatus
  format: ILeagueFormat
  date_start: string | null
  date_end: string | null
  players_min: number
  players_max: number | null
  rounds: number
}

const ApiLeague = {
  toLeague: (apiLeague: IApiLeague): ILeague => ({
    id: `${apiLeague.id}`,
    creator: apiLeague.creator || undefined,
    players: apiLeague.players,
    status: apiLeague.status,
    format: apiLeague.format,
    dateStart: apiLeague.date_start || undefined,
    dateEnd: apiLeague.date_end || undefined,
    playersMin: apiLeague.players_min,
    playersMax: apiLeague.players_max || undefined,
    rounds: apiLeague.rounds,
  }),
}

export default ApiLeague
