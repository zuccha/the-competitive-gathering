import classnames from 'classnames'
import { Field } from 'formik'
import React from 'react'
import FormField from '../FormField'
import styles from './FormPassword.module.css'

interface IFormPasswordProps {
  className?: string
  name: string
  label?: string
  placeholder?: string
  leaveSpaceForError?: boolean
}

const FormPassword: React.FC<IFormPasswordProps> = ({
  className,
  name,
  label,
  placeholder,
  leaveSpaceForError,
}) => {
  return (
    <FormField
      className={classnames(styles['form-password'], className)}
      name={name}
      label={label}
      leaveSpaceForError={leaveSpaceForError}
    >
      <Field name={name} placeholder={placeholder} type='password' />
    </FormField>
  )
}

export default FormPassword
