import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { ILeague } from '../../../../../types/League'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import selectLeagues from '../../selectors/selectLeagues'
import selectLeaguesStatus from '../../selectors/selectLeaguesStatus'
import fetchLeagues from '../../thunks/fetchLeagues'


const useLeagues = (): [ILeague[] | undefined, IRequestStatus] => {
  const leagues = useSelector(selectLeagues)
  const leaguesStatus = useSelector(selectLeaguesStatus)

  usePrefetch(leaguesStatus, fetchLeagues)

  return [leagues, leaguesStatus]
}

export default useLeagues
