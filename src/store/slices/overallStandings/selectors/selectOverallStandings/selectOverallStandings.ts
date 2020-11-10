import { IStoreState } from '../../../../store'
import { IOverallStandingsState } from '../../overallStandings'

const selectOverallStandings = (state: IStoreState): IOverallStandingsState => state.overallStandings

export default selectOverallStandings
