import { IStoreState } from '../../../../store'
import { ILeaguesState } from '../../leagues'

const selectLeagues = (state: IStoreState): ILeaguesState => state.leagues

export default selectLeagues
