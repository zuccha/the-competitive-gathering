import React from 'react'
import Button from '../Button'
import Modal from '../Modal'
import styles from './ModalConfirmation.module.css'

type IModalConfirmationProps = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ModalConfirmation: React.FC<IModalConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal onClickOutside={onCancel}>
      <div className={styles['modal-confirmation']}>
        <h3>Confirmation</h3>
        <div>{message}</div>
        <div className={styles['modal-confirmation-buttons']}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmation
