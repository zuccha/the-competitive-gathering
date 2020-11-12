import { useCallback, useState } from 'react'
import useIsMounted from '../useIsMounted'

const useModal = (isOpenByDefault = false): [boolean, () => void, () => void] => {
  const isMounted = useIsMounted()
  const [isOpen, setIsOpen] = useState(isOpenByDefault)

  const open = useCallback(() => {
    if (isMounted) {
      setIsOpen(true)
    }
  }, [])

  const close = useCallback(() => {
    if (isMounted) {
      setIsOpen(false)
    }
  }, [])

  return [isOpen, open, close]
}

export default useModal
