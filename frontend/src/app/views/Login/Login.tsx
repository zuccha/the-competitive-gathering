import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { IStoreDispatch } from '../../../store'
import { login } from '../../../store/slices/auth'
import when from '../../../utils/when'
import Button from '../../components/Button'
import FormPassword from '../../components/FormPassword'
import FormText from '../../components/FormText'
import styles from './Login.module.css'

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const Login: React.FC = () => {
  const history = useHistory()
  const dispatch: IStoreDispatch = useDispatch()

  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    dispatch(login({ username: values.username, password: values.password }))
      .then(unwrapResult)
      .then(() => { history.replace({ pathname: "/" }) })
      .catch(error => {
        const errorMessage = when([
          [error.code === '401', () => 'Invalid credentials'],
          [error.code === '500', () => 'We had a problem'],
        ], () => 'An error occurred')
        actions.setFieldError('password', errorMessage)
        actions.setSubmitting(false)
      })
  }, [dispatch, history])

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ dirty, isSubmitting, isValid }) => (
        <Form className={styles['login-form']}>
          <h2>Login</h2>
          <FormText
            className={styles['login-form-input']}
            name='username'
            placeholder='Username'
            leaveSpaceForError
          />
          <FormPassword
            className={styles['login-form-input']}
            name='password'
            placeholder='Password'
            leaveSpaceForError
          />
          <Button type="submit" disabled={!dirty || !isValid || isSubmitting}>
            {isSubmitting ? 'Login...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
