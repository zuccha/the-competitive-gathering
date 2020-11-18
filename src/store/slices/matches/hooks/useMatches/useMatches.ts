import { useSelector } from 'react-redux'
import usePrefetch from '../../../../../app/hooks/usePrefetch'
import { IMatch } from '../../../../../types/Match'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import selectMatches from '../../selectors/selectMatches'
import selectMatchesStatus from '../../selectors/selectMatchesStatus'
import fetchMatches from '../../thunks/fetchMatches'

const useMatches = (): [IMatch[] | undefined, IRequestStatus] => {
  const matches = useSelector(selectMatches)
  const matchesStatus = useSelector(selectMatchesStatus)

  usePrefetch(matchesStatus, fetchMatches)

  return [matches, matchesStatus]
}

export default useMatches
