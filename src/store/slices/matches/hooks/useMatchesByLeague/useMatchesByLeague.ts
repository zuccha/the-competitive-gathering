import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { IMatch } from '../../../../../types/Match'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import selectMatchesByLeague from '../../selectors/selectMatchesByLeague'
import selectMatchesStatusByLeague from '../../selectors/selectMatchesStatusByLeague'
import fetchMatchesByLeague from '../../thunks/fetchMatchesByLeague'

const useMatchesByLeague = (id: string): [IMatch[] | undefined, IRequestStatus] => {
  const fetchMatches = useCallback(() => fetchMatchesByLeague(id), [id])

  const selectMatches = useCallback(selectMatchesByLeague(id), [id])
  const selectMatchesStatus = useCallback(selectMatchesStatusByLeague(id), [id])

  const matches = useSelector(selectMatches)
  const matchesStatus = useSelector(selectMatchesStatus)

  usePrefetch(matchesStatus, fetchMatches)

  return [matches, matchesStatus]
}

export default useMatchesByLeague
