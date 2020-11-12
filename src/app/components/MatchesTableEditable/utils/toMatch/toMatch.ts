import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatch = (matchForTable: IMatchForTable): IMatch => ({
  id: matchForTable.id,
  username1: matchForTable.username1,
  username2: matchForTable.username2,
  results: matchForTable.gamesDrew === undefined
    ? undefined
    : {
      gamesWonByUsername1: matchForTable.gamesWonByUsername1 || 0,
      gamesWonByUsername2: matchForTable.gamesWonByUsername2 || 0,
      gamesDrew: matchForTable.gamesDrew || 0,
    },
})
export default toMatch
