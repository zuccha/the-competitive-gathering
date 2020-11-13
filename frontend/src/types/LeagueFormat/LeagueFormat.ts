export type ILeagueFormat = 'STANDARD'
  | 'PIONEER'
  | 'MODERN'
  | 'LEGACY'
  | 'VINTAGE'
  | 'COMMANDER'
  | 'PAUPER'
  | 'DRAFT'
  | 'SEALED'
  | 'OTHER'

const LeagueFormat = {
  toString: (leagueFormat: ILeagueFormat): string => {
    return leagueFormat.toLowerCase()
  },
}

export default LeagueFormat
