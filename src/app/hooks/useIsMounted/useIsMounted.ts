import { useEffect, useRef } from 'react'

const useIsMounted = (): boolean => {
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  return isMountedRef.current
}

export default useIsMounted
