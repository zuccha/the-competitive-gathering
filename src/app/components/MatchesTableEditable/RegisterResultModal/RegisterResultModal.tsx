import { unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { IStoreDispatch } from '../../../../store'
import { registerMatchResult } from '../../../../store/slices/leaguesMatches'
import { IMatch } from '../../../../types/Match'
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
  gamesDraw: gameValidation
    .test('total-games', 'Total number of games must be between 0 and 3', function() {
      if (!this.parent) {
        return true
      }
      const { gamesWonByUsername1, gamesWonByUsername2, gamesDraw } = this.parent
      if (
        isNaN(parseInt(gamesWonByUsername1)) ||
        isNaN(parseInt(gamesWonByUsername2)) ||
        isNaN(parseInt(gamesDraw))
      ) {
        return true
      }
      const sum = gamesWonByUsername1 + gamesWonByUsername2 + gamesDraw
      return 0 <= sum && sum <= 3
    }),
})

type IRegisterResultModalProps = {
  match: IMatch
  onRegister: () => void
  onCancel: () => void
}

const RegisterResultModal: React.FC<IRegisterResultModalProps> = ({
  match,
  onRegister,
  onCancel,
}) => {
  const dispatch: IStoreDispatch = useDispatch()

  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    dispatch(registerMatchResult({
      id: match.id,
      username1: match.username1,
      username2: match.username2,
      results: {
        gamesWonByUsername1: values.gamesWonByUsername1,
        gamesWonByUsername2: values.gamesWonByUsername2,
        gamesDraw: values.gamesDraw,
      },
    }))
      .then(unwrapResult)
      .then(() => {
        actions.setSubmitting(false)
        onRegister()
      })
      .catch(() => {
        actions.setSubmitting(false)
      })
  }, [dispatch])

  return (
    <Modal onClickOutside={onCancel}>
      <Formik
        initialValues={{
          gamesWonByUsername1: '',
          gamesWonByUsername2: '',
          gamesDraw: '',
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
              name='gamesDraw'
              label='Games drew'
              placeholder='Games'
              leaveSpaceForError
            />
            <div className={styles['register-result-modal-buttons']}>
              <button disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" disabled={!dirty || !isValid || isSubmitting}>
                {isSubmitting ? 'Register...' : 'Register'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default RegisterResultModal
