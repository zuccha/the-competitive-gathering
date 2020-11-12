import classnames from 'classnames'
import React from 'react'
import styles from './Button.module.css'

type IButtonProps = {
  children: React.ReactChild
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  disabled = false,
  type,
  onClick,
}) => {
  return (
    <button
      className={classnames(styles.button, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
