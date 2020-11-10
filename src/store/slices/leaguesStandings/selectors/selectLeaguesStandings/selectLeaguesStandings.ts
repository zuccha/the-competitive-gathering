import { IStoreState } from '../../../../store'
import { ILeaguesStandingsState } from '../../leaguesStandings'

const selectLeaguesStandings = (state: IStoreState): ILeaguesStandingsState => state.leaguesStandings

export default selectLeaguesStandings
