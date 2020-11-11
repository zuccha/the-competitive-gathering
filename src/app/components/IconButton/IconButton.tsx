import classnames from 'classnames'
import React from 'react'
import styles from './IconButton.module.css'

type IIconButtonProps = {
  children: React.ReactChild
  disabled?: boolean
  onClick: () => void
}

const IconButton: React.FC<IIconButtonProps> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={classnames(
        styles['icon-button'],
        disabled && styles['icon-button-disabled'],
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default IconButton
