export type IMatchStatus = 'PENDING' | 'DONE'

const MatchStatus = {
  toString: (matchStatus: IMatchStatus): string => {
    return matchStatus.toLowerCase()
  },
}

  export default MatchStatus
