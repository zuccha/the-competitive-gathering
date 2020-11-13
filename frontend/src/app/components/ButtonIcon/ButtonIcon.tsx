import classnames from 'classnames'
import React from 'react'
import styles from './ButtonIcon.module.css'

type IButtonIconProps = {
  children: React.ReactChild
  disabled?: boolean
  onClick: () => void
}

const ButtonIcon: React.FC<IButtonIconProps> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={classnames(
        styles['button-icon'],
        disabled && styles['button-icon-disabled'],
      )}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  )
}

export default ButtonIcon
