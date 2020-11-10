import React, { useCallback } from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../../store/slices/auth'

const Login = () => {
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
    >
      <Form>
        <Field name='username' type='text' />
        <Field name='password' type='text' />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  )
}

export default Login
