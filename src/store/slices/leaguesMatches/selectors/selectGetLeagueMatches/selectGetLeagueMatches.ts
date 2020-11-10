import { IMatch } from '../../../../../types/Match'
import Request, { IRequest } from '../../../../../types/Request'
import { IStoreState } from '../../../../store'

const selectGetLeagueMatches = (state: IStoreState) => {
  return (id: string): IRequest<IMatch[]> => state.leaguesMatches[id] || Request.makeInitial()
}

export default selectGetLeagueMatches
