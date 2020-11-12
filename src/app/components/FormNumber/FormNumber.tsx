import classnames from 'classnames'
import { Field } from 'formik'
import React from 'react'
import FormField from '../FormField'
import styles from './FormNumber.module.css'

interface IFormNumberProps {
  className?: string
  name: string
  label?: string
  placeholder?: string
  leaveSpaceForError?: boolean
  min?: number
  max?: number
}

const FormNumber: React.FC<IFormNumberProps> = ({
  className,
  name,
  label,
  placeholder,
  leaveSpaceForError,
  min,
  max,
}) => {
  return (
    <FormField
      className={classnames(styles['form-number'], className)}
      name={name}
      label={label}
      leaveSpaceForError={leaveSpaceForError}
    >
      <Field
        name={name}
        placeholder={placeholder}
        type='number'
        min={min}
        max={max}
      />
    </FormField>
  )
}

export default FormNumber
