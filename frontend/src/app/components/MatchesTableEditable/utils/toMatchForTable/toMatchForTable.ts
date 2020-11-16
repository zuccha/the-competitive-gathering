import { IMatch } from '../../../../../types/Match'
import { IMatchForTable } from '../../types'

const toMatchForTable = (match: IMatch): IMatchForTable => ({
  ...match,
  actions: ['register-result'],
})

export default toMatchForTable
