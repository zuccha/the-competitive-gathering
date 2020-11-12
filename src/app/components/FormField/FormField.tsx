import React from 'react'
import classnames from 'classnames'
import { ErrorMessage } from 'formik'
import styles from './FormField.module.css'

interface IFormFieldProps {
  className?: string
  children: React.ReactChild
  name: string
  label?: string
  leaveSpaceForError?: boolean
}

const FormField: React.FC<IFormFieldProps> = ({
  className,
  children,
  name,
  label,
  leaveSpaceForError,
}) => (
  <div className={classnames(styles['form-field'], className)}>
    {label && <div className={styles['form-field-label']}>{label}</div>}
    {children}
    <div
      className={classnames(
        styles['form-field-error-message'],
        leaveSpaceForError && styles['form-field-error-message-always-spaced'],
      )}
    >
      <ErrorMessage name={name} />
    </div>
  </div>
)

export default FormField
