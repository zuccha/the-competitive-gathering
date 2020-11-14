import { IStoreState } from '../../../../../..'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectLeaguesStatus = (state: IStoreState): IRequestStatus => state.leagues.ids.status

export default selectLeaguesStatus
