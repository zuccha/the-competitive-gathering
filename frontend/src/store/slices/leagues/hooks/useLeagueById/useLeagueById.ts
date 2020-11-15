import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { ILeague } from '../../../../../types/League'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import selectLeagueById from '../../selectors/selectLeagueById'
import selectLeagueStatusById from '../../selectors/selectLeagueStatusById'
import fetchLeagueById from '../../thunks/fetchLeagueById'

const useLeagueById = (id: string): [ILeague | undefined, IRequestStatus] => {
  const fetchLeague = useCallback(() => fetchLeagueById(id), [id])

  const selectLeague = useCallback(selectLeagueById(id), [id])
  const selectLeagueStatus = useCallback(selectLeagueStatusById(id), [id])

  const league = useSelector(selectLeague)
  const leagueStatus = useSelector(selectLeagueStatus)

  usePrefetch(leagueStatus, fetchLeague)

  return [league, leagueStatus]
}

export default useLeagueById
