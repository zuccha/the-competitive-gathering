import React, { useCallback } from 'react'
import styles from './Modal.module.css'

type IModalProps = {
  children: React.ReactChild
  onClickOutside?: () => void
}

const Modal: React.FC<IModalProps> = ({
  children,
  onClickOutside,
}) => {
  const stopClickPropagation = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }, [])

  return (
    <div className={styles['modal']} onClick={onClickOutside}>
      <div className={styles['modal-panel']} onClick={stopClickPropagation}>
        {children}
      </div>
    </div>
  )
}

export default Modal
