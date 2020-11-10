import React, { useCallback } from 'react'
import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from '../../../store/slices/auth'
import FormInput from '../../components/FormInput'
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
          <FormInput
            className={styles['login-form-input']}
            name='username'
            placeholder='Username'
          />
          <FormInput
            className={styles['login-form-input']}
            name='password'
            placeholder='Password'
            type='password'
          />
          <button type="submit" disabled={!isValid || !dirty}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
