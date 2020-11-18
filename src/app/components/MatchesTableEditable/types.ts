import { IMatch } from '../../../types/Match'

export type IAction = 'register-result'

export type IMatchForTable = IMatch & {
  actions: IAction[]
}
