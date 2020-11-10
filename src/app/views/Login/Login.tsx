import React, { useCallback } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from '../../../store/slices/auth'
import styles from './Login.module.css'

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = useCallback(values => {
    dispatch(login(`fake-token-for-${values.username}`))
    history.replace({ pathname: "/" })
  }, [dispatch, history])

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ isValid, dirty }) => (
        <Form className={styles['login-form']}>
          <div className={styles['login-field-container']}>
            <Field name='username' placeholder='Username' />
            <div className={styles['login-error-message']}>
              <ErrorMessage name='username' />
            </div>
          </div>
          <div className={styles['login-field-container']}>
            <Field name='password' placeholder='Password' type='password' />
            <div className={styles['login-error-message']}>
              <ErrorMessage name='password' />
            </div>
          </div>
          <button type="submit" disabled={!isValid || !dirty}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
