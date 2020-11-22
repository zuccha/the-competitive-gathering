import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { IStoreDispatch } from '../../../../store'
import { changePassword, selectUsername } from '../../../../store/slices/auth'
import when from '../../../../utils/when'
import Button from '../../../components/Button'
import FormPassword from '../../../components/FormPassword'
import styles from './ChangePassword.module.css'

const changePasswordValidationSchema = Yup.object().shape({
  passwordOld: Yup.string().required('Required'),
  passwordNew: Yup.string().required('Required'),
  passwordNewConfirmation: Yup.string()
    .required('Required')
    .test('password-confirmation', 'The passwords are different', function() {
      return this.parent && this.parent.passwordNew === this.parent.passwordNewConfirmation
    }),
})

const ChangePassword: React.FC = () => {
  const history = useHistory()
  const dispatch: IStoreDispatch = useDispatch()
  const username = useSelector(selectUsername)

  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    dispatch(changePassword({
      username: username!,
      passwordOld: values.passwordOld,
      passwordNew: values.passwordNew,
    }))
      .then(unwrapResult)
      .then(() => { history.replace({ pathname: '/' }) })
      .catch(error => {
        const errorMessage = when([
          [error.code === '400', () => 'The old password does\'t match'],
          [error.code === '500', () => 'We had a problem'],
        ], () => 'An error occurred')
        actions.setFieldError('passwordNewConfirmation', errorMessage)
        actions.setSubmitting(false)
      })
  }, [dispatch, history, username])

  if (username === undefined) {
    return null
  }

  return (
    <Formik
      initialValues={{ passwordOld: '', passwordNew: '', passwordNewConfirmation: '' }}
      onSubmit={handleSubmit}
      validationSchema={changePasswordValidationSchema}
    >
      {({ dirty, isSubmitting, isValid }) => (
        <Form className={styles['change-password']}>
          <h2>Change password</h2>
          <FormPassword
            className={styles['change-password-input']}
            name='passwordOld'
            label='Old password'
            placeholder='Password'
            leaveSpaceForError
          />
          <FormPassword
            className={styles['change-password-input']}
            name='passwordNew'
            label='New password'
            placeholder='Password'
            leaveSpaceForError
          />
          <FormPassword
            className={styles['change-password-input']}
            name='passwordNewConfirmation'
            label='Confirm password'
            placeholder='Password'
            leaveSpaceForError
          />
          <Button
            type="submit"
            disabled={!dirty || !isValid || isSubmitting}
            className={styles['change-password-button']}
          >
            {isSubmitting ? 'Change...' : 'Change'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default ChangePassword
