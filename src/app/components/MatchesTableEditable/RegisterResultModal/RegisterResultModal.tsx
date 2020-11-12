import { SerializedError, unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { IMatch } from '../../../../types/Match'
import when from '../../../../utils/when'
import Button from '../../Button'
import FormInput from '../../FormInput'
import Modal from '../../Modal'
import styles from './RegisterResultModal.module.css'

const gameValidation = Yup
  .number()
  .typeError('Must be a number')
  .integer('Must be a number')
  .min(0, 'Must be greater or equal than 0')
  .max(2, 'Must be lesser or equal than 2')
  .required('Required')

const confirmResultsValidationSchema = Yup.object().shape({
  gamesWonByUsername1: gameValidation,
  gamesWonByUsername2: gameValidation,
  gamesDrew: gameValidation
    .test('total-games', 'Total number of games must be between 0 and 3', function() {
      if (!this.parent) {
        return true
      }
      const { gamesWonByUsername1, gamesWonByUsername2, gamesDrew } = this.parent
      if (
        isNaN(parseInt(gamesWonByUsername1)) ||
        isNaN(parseInt(gamesWonByUsername2)) ||
        isNaN(parseInt(gamesDrew))
      ) {
        return true
      }
      const sum = gamesWonByUsername1 + gamesWonByUsername2 + gamesDrew
      return 0 <= sum && sum <= 3
    }),
})

type IRegisterResultModalProps = {
  match: IMatch
  onRegisterResult: (match: IMatch) => Promise<{ error?: SerializedError, payload: unknown }>
  onRegisterResultSuccess: () => void
  onRegisterResultFailure: () => void
  onCancel: () => void
}

const RegisterResultModal: React.FC<IRegisterResultModalProps> = ({
  match,
  onRegisterResult,
  onRegisterResultSuccess,
  onRegisterResultFailure,
  onCancel,
}) => {
  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    onRegisterResult({
      id: match.id,
      username1: match.username1,
      username2: match.username2,
      results: {
        gamesWonByUsername1: values.gamesWonByUsername1,
        gamesWonByUsername2: values.gamesWonByUsername2,
        gamesDrew: values.gamesDrew,
      },
    })
      .then(unwrapResult)
      .then(() => {
        actions.setSubmitting(false)
        onRegisterResultSuccess()
      })
      .catch(error => {
        const errorMessage = when([
          [error.code === '400', () => 'The provided results are not valid'],
          [error.code === '403', () => 'You cannot register results for this match'],
          [error.code === '500', () => 'There was a problem, try again'],
        ], () => 'An error occurred')
        actions.setFieldError('gamesDrew', errorMessage)
        actions.setSubmitting(false)
        onRegisterResultFailure()
      })
  }, [onRegisterResult, onRegisterResultSuccess, onRegisterResultFailure])

  return (
    <Modal onClickOutside={onCancel}>
      <Formik
        initialValues={{
          gamesWonByUsername1: '',
          gamesWonByUsername2: '',
          gamesDrew: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={confirmResultsValidationSchema}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className={styles['register-result-modal']}>
            <h3>Register match results</h3>
            <FormInput
              className={styles['register-result-modal-input']}
              name='gamesWonByUsername1'
              label={`Games won by ${match.username1}`}
              placeholder='Games'
              leaveSpaceForError
            />
            <FormInput
              className={styles['register-result-modal-input']}
              name='gamesWonByUsername2'
              label={`Games won by ${match.username2}`}
              placeholder='Games'
              leaveSpaceForError
            />
            <FormInput
              className={styles['register-result-modal-input']}
              name='gamesDrew'
              label='Games drew'
              placeholder='Games'
              leaveSpaceForError
            />
            <div className={styles['register-result-modal-buttons']}>
              <Button disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!dirty || !isValid || isSubmitting}>
                {isSubmitting ? 'Register...' : 'Register'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default RegisterResultModal
