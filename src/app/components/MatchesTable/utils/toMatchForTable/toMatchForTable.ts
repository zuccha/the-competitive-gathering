import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatchForTable = (match: IMatch): IMatchForTable => ({
  id: match.id,
  username1: match.username1,
  username2: match.username2,
  gamesWonByUsername1: match.results?.gamesWonByUsername1,
  gamesWonByUsername2: match.results?.gamesWonByUsername2,
  gamesDraw: match.results?.gamesDraw,
  actions: ['register-result'],
})

export default toMatchForTable
