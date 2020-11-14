import { PayloadAction, unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { selectUsername } from '../../../../../../store/slices/auth'
import { IApiLeagueInput } from '../../../../../../types/ApiLeagueInput'
import { ILeague } from '../../../../../../types/League'
import when from '../../../../../../utils/when'
import Button from '../../../../../components/Button'
import FormNumber from '../../../../../components/FormNumber'
import FormText from '../../../../../components/FormText'
import Modal from '../../../../../components/Modal'
import styles from './CreateLeagueModal.module.css'

const areValuesValid = function(values?: { playersMin?: number, playersMax?: number }) {
  return !values
    || values.playersMin === undefined
    || values.playersMax === undefined
    || values.playersMin <= values.playersMax
}

const createLeagueValidationSchema = Yup.object().shape({
  playersMin: Yup.number()
    .min(2)
    .required('Required')
    .test('min-greater-or-equal-than-max', 'min <= max', function() { return areValuesValid(this.parent) }),
  playersMax: Yup.number()
    .min(2)
    .test('max-smaller-or-equal-than-min', 'max >= min', function() { return areValuesValid(this.parent) }),
  format: Yup.string().required('Required'),
})

type ICreateLeagueModalProps = {
  onCreateLeague: (league: IApiLeagueInput) => Promise<PayloadAction<ILeague | unknown>>
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
  const username = useSelector(selectUsername)

  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    onCreateLeague({
      creator: username,
      players: [],
      format: values.format,
      players_min: values.playersMin,
      players_max: values.playersMax,
      rounds: 1,
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
          playersMin: 2,
          playersMax: undefined,
        }}
        onSubmit={handleSubmit}
        validationSchema={createLeagueValidationSchema}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className={styles['create-league-modal']}>
            <h3>Create new league</h3>
            <div className={styles['create-league-modal-players']}>
              <FormNumber
                name='playersMin'
                label='Min. players'
                placeholder='2'
                leaveSpaceForError
                min={2}
              />
              <FormNumber
                name='playersMax'
                label='Max. players'
                placeholder='Any'
                leaveSpaceForError
                min={2}
              />
            </div>
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
