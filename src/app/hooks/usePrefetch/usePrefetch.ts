import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch, IStoreState } from '../../../store'
import { IRequestStatus } from '../../../types/RequestStatus'
import { AsyncThunkAction } from '@reduxjs/toolkit'

const usePrefetch = (
  resourceStatus: IRequestStatus,
  fetchResource: () => AsyncThunkAction<unknown, unknown, { dispatch: IStoreDispatch, state: IStoreState }>,
): void => {
  const dispatch: IStoreDispatch = useDispatch()

  useEffect(() => {
    if (resourceStatus === 'initial') {
      dispatch(fetchResource())
        .catch(() => { /* ignore error */ })
    }
  }, [dispatch, resourceStatus, fetchResource])
}

export default usePrefetch
