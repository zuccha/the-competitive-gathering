import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatch = (matchForTable: IMatchForTable): IMatch => ({
  ...matchForTable,
})

export default toMatch
