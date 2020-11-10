import { IStoreState } from '../../../../store'
import { IStandingsOverallState } from '../../standingsOverall'

const selectStandingsOverall = (state: IStoreState): IStandingsOverallState => state.standingsOverall

export default selectStandingsOverall
