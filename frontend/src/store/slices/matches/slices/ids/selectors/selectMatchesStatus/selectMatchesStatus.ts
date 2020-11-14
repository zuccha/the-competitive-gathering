import { IStoreState } from '../../../../../..'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectMatchesStatus = (state: IStoreState): IRequestStatus => state.matches.ids.status

export default selectMatchesStatus
