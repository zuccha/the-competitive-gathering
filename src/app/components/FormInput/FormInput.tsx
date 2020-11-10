import React from 'react'
import classnames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import styles from './FormInput.module.css'

interface IFormInputProps {
  className?: string,
  name: string,
  placeholder?: string,
  type?: string,
}

const FormInput: React.FC<IFormInputProps> = ({
  className,
  name,
  placeholder,
  type,
}) => (
  <div className={classnames(styles['form-input'], className)}>
    <Field name={name} placeholder={placeholder} type={type} />
    <div className={styles['form-input-error-message']}>
      <ErrorMessage name={name} />
    </div>
  </div>
)

export default FormInput
