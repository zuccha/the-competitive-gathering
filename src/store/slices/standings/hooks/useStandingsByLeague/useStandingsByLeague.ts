import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStanding } from '../../../../../types/Standing'
import selectStandingsByLeague from '../../selectors/selectStandingsByLeague'
import selectStandingsStatusByLeague from '../../selectors/selectStandingsStatusByLeague'
import fetchStandingsByLeague from '../../thunks/fetchStandingsByLeague'

const useStandingsByLeague = (id: string): [IStanding[] | undefined, IRequestStatus] => {
  const fetchStandings = useCallback(() => fetchStandingsByLeague(id), [id])

  const selectStandings = useCallback(selectStandingsByLeague(id), [id])
  const selectStandingsStatus = useCallback(selectStandingsStatusByLeague(id), [id])

  const standings = useSelector(selectStandings)
  const standingsStatus = useSelector(selectStandingsStatus)

  usePrefetch(standingsStatus, fetchStandings)

  return [standings, standingsStatus]
}

export default useStandingsByLeague
