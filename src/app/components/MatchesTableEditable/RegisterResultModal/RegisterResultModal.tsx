import { SerializedError, unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { IMatch } from '../../../../types/Match'
import when from '../../../../utils/when'
import Button from '../../Button'
import FormNumber from '../../FormNumber'
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
  gamesWonByPlayer1: gameValidation,
  gamesWonByPlayer2: gameValidation,
  gamesDrew: gameValidation
    .test('total-games', 'Total number of games must be between 0 and 3', function() {
      if (!this.parent) {
        return true
      }
      const { gamesWonByPlayer1, gamesWonByPlayer2, gamesDrew } = this.parent
      if (
        isNaN(parseInt(gamesWonByPlayer1)) ||
        isNaN(parseInt(gamesWonByPlayer2)) ||
        isNaN(parseInt(gamesDrew))
      ) {
        return true
      }
      const sum = gamesWonByPlayer1 + gamesWonByPlayer2 + gamesDrew
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
      ...match,
      status: 'DONE',
      gamesWonByPlayer1: values.gamesWonByPlayer1,
      gamesWonByPlayer2: values.gamesWonByPlayer2,
      gamesDrew: values.gamesDrew,
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
          gamesWonByPlayer1: '',
          gamesWonByPlayer2: '',
          gamesDrew: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={confirmResultsValidationSchema}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className={styles['register-result-modal']}>
            <h3>Register match results</h3>
            <FormNumber
              className={styles['register-result-modal-input']}
              name='gamesWonByPlayer1'
              label={`Games won by ${match.player1}`}
              placeholder='0'
              leaveSpaceForError
              min={0}
              max={2}
            />
            <FormNumber
              className={styles['register-result-modal-input']}
              name='gamesWonByPlayer2'
              label={`Games won by ${match.player2}`}
              placeholder='0'
              leaveSpaceForError
              min={0}
              max={2}
            />
            <FormNumber
              className={styles['register-result-modal-input']}
              name='gamesDrew'
              label='Games drew'
              placeholder='0'
              leaveSpaceForError
              min={0}
              max={2}
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
