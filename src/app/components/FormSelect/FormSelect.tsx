import classnames from 'classnames'
import { Field } from 'formik'
import React from 'react'
import FormField from '../FormField'
import styles from './FormSelect.module.css'

interface IFormSelectProps {
  className?: string
  name: string
  label?: string
  placeholder?: string
  options: { value: string, label: string }[]
  leaveSpaceForError?: boolean
}

const FormSelect: React.FC<IFormSelectProps> = ({
  className,
  name,
  label,
  placeholder,
  options,
  leaveSpaceForError,
}) => {
  return (
    <FormField
      className={classnames(styles['form-text'], className)}
      name={name}
      label={label}
      leaveSpaceForError={leaveSpaceForError}
    >
      <Field as='select' name={name} placeholder={placeholder}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </FormField>
  )
}

export default FormSelect
