import { PayloadAction, unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { ILeague } from '../../../../../../types/League'
import when from '../../../../../../utils/when'
import Button from '../../../../../components/Button'
import FormText from '../../../../../components/FormText'
import Modal from '../../../../../components/Modal'
import styles from './CreateLeagueModal.module.css'

const createLeagueValidationSchema = Yup.object().shape({
  format: Yup.string().required('Required'),
})

type ICreateLeagueModalProps = {
  onCreateLeague: (league: ILeague) => Promise<PayloadAction<ILeague | unknown>>
  onCreateLeagueSuccess: (league: ILeague) => void
  onCreateLeagueFailure: () => void
  onCancel: () => void
}

const CreateLeagueModal: React.FC<ICreateLeagueModalProps> = ({
  onCreateLeague,
  onCreateLeagueSuccess,
  onCreateLeagueFailure,
  onCancel,
}) => {
  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    onCreateLeague({
      id: '',
      format: values.format,
      dateStart: undefined,
      dateEnd: undefined,
    })
      .then(unwrapResult)
      .then(league => {
        actions.setSubmitting(false)
        onCreateLeagueSuccess(league as ILeague)
      })
      .catch(error => {
        const errorMessage = when([
          [error.code === '400', () => 'The provided values are not valid'],
          [error.code === '403', () => 'You don\'t have persmissions to create a league'],
          [error.code === '500', () => 'There was a problem, try again'],
        ], () => 'An error occurred')
        actions.setFieldError('format', errorMessage)
        actions.setSubmitting(false)
        onCreateLeagueFailure()
      })
  }, [onCreateLeague, onCreateLeagueSuccess, onCreateLeagueFailure])

  return (
    <Modal onClickOutside={onCancel}>
      <Formik
        initialValues={{
          format: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={createLeagueValidationSchema}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className={styles['create-league-modal']}>
            <h3>Create new league</h3>
            <FormText
              className={styles['create-league-modal-input']}
              name='format'
              label='Format'
              placeholder='Modern, Legacy, ...'
              leaveSpaceForError
            />
            <div className={styles['create-league-modal-buttons']}>
              <Button disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!dirty || !isValid || isSubmitting}>
                {isSubmitting ? 'Create...' : 'Create'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateLeagueModal
