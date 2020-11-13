import Request, { IRequest } from '../../../../../types/Request'
import { IStoreState } from '../../../../store'
import { IStanding } from '../../../../../types/Standing'

const selectGetLeagueStandings = (state: IStoreState) => {
  return (id: string): IRequest<IStanding[]> => state.leaguesStandings[id] || Request.makeInitial()
}

export default selectGetLeagueStandings
