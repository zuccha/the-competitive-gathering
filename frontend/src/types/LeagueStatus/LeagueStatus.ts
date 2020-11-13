export type ILeagueStatus = 'PENDING' | 'ONGOING' | 'CANCELED' | 'DONE'

const LeagueStatus = {
  toString: (leagueStatus: ILeagueStatus): string => {
    return leagueStatus.toLowerCase()
  },
}

  export default LeagueStatus
