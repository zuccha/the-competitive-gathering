import classnames from 'classnames'
import { Field } from 'formik'
import React from 'react'
import FormField from '../FormField'
import styles from './FormText.module.css'

interface IFormTextProps {
  className?: string
  name: string
  label?: string
  placeholder?: string
  leaveSpaceForError?: boolean
  maxLength?: number
}

const FormText: React.FC<IFormTextProps> = ({
  className,
  name,
  label,
  placeholder,
  leaveSpaceForError,
  maxLength,
}) => {
  return (
    <FormField
      className={classnames(styles['form-text'], className)}
      name={name}
      label={label}
      leaveSpaceForError={leaveSpaceForError}
    >
      <Field name={name} placeholder={placeholder} maxLength={maxLength} />
    </FormField>
  )
}

export default FormText
