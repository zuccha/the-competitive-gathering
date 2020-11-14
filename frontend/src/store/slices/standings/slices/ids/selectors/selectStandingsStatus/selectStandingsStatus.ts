import { IStoreState } from '../../../../../..'
import { IRequestStatus } from '../../../../../../../types/RequestStatus'

const selectStandingsStatus = (state: IStoreState): IRequestStatus => state.standings.ids.status

export default selectStandingsStatus
