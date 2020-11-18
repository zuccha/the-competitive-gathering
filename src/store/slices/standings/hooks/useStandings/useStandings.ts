import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStanding } from '../../../../../types/Standing'
import selectStandings from '../../selectors/selectStandings'
import selectStandingsStatus from '../../selectors/selectStandingsStatus'
import fetchStandings from '../../thunks/fetchStandings'

const useStandings = (): [IStanding[] | undefined, IRequestStatus] => {
  const standings = useSelector(selectStandings)
  const standingsStatus = useSelector(selectStandingsStatus)

  usePrefetch(standingsStatus, fetchStandings)

  return [standings, standingsStatus]
}

export default useStandings
