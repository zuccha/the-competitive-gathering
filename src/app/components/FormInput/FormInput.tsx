import React from 'react'
import classnames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import styles from './FormInput.module.css'

interface IFormInputProps {
  className?: string
  name: string
  label?: string
  placeholder?: string
  type?: string
  leaveSpaceForError?: boolean
}

const FormInput: React.FC<IFormInputProps> = ({
  className,
  name,
  label,
  placeholder,
  type,
  leaveSpaceForError,
}) => (
  <div className={classnames(styles['form-input'], className)}>
    {label && <div className={styles['form-input-label']}>{label}</div>}
    <Field name={name} placeholder={placeholder} type={type} />
    <div
      className={classnames(
        styles['form-input-error-message'],
        leaveSpaceForError && styles['form-input-error-message-always-spaced'],
      )}
    >
      <ErrorMessage name={name} />
    </div>
  </div>
)

export default FormInput
