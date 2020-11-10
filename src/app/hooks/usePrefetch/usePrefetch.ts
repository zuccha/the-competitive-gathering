import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch, IStoreState } from '../../../store'
import { IRequestStatus } from '../../../types/RequestStatus'
import { AsyncThunk } from '@reduxjs/toolkit'

const usePrefetch = <R>(
  resourceStatus: IRequestStatus,
  fetchResource: AsyncThunk<R, void, { dispatch: IStoreDispatch, state: IStoreState }>,
): void => {
  const dispatch: IStoreDispatch = useDispatch()

  useEffect(() => {
    if (resourceStatus === 'initial') {
      dispatch(fetchResource())
    }
  }, [dispatch, resourceStatus, fetchResource])
}

export default usePrefetch
