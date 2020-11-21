import { PayloadAction, unwrapResult } from '@reduxjs/toolkit'
import { Formik, Form } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { IApiLeagueInput } from '../../../../../../types/ApiLeagueInput'
import { ILeague } from '../../../../../../types/League'
import when from '../../../../../../utils/when'
import Button from '../../../../../components/Button'
import FormNumber from '../../../../../components/FormNumber'
import FormSelect from '../../../../../components/FormSelect'
import FormText from '../../../../../components/FormText'
import Modal from '../../../../../components/Modal'
import styles from './CreateLeagueModal.module.css'

const formatOptions = [
  { value: 'STANDARD', label: 'Standard' },
  { value: 'PIONEER', label: 'Pioneer' },
  { value: 'MODERN', label: 'Modern' },
  { value: 'LEGACY', label: 'Legacy' },
  { value: 'VINTAGE', label: 'Vintage' },
  { value: 'COMMANDER', label: 'Commander' },
  { value: 'PAUPER', label: 'Pauper' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SEALED', label: 'Sealed' },
  { value: 'OTHER', label: 'Other' },
]

const areValuesValid = function(values?: { playersMin?: number, playersMax?: number }) {
  return !values
    || values.playersMin === undefined
    || values.playersMax === undefined
    || values.playersMin <= values.playersMax
}

const createLeagueValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required').max(32, 'The name should be at most 32 characters long'),
  format: Yup.string().required('Required'),
  playersMin: Yup.number()
    .min(2)
    .required('Required')
    .test('min-greater-or-equal-than-max', 'min <= max', function() { return areValuesValid(this.parent) }),
  playersMax: Yup.number()
    .min(2)
    .test('max-smaller-or-equal-than-min', 'max >= min', function() { return areValuesValid(this.parent) }),
  rounds: Yup.number().min(1).required('Required'),
})

type ICreateLeagueModalProps = {
  username: string,
  onCreateLeague: (league: IApiLeagueInput) => Promise<PayloadAction<ILeague | unknown>>
  onCreateLeagueSuccess: (league: ILeague) => void
  onCreateLeagueFailure: () => void
  onCancel: () => void
}

const CreateLeagueModal: React.FC<ICreateLeagueModalProps> = ({
  username,
  onCreateLeague,
  onCreateLeagueSuccess,
  onCreateLeagueFailure,
  onCancel,
}) => {
  const handleSubmit = useCallback((values, actions) => {
    actions.setSubmitting(true)
    onCreateLeague({
      name: values.name,
      creator: username,
      players: [username],
      format: values.format,
      players_min: values.playersMin,
      players_max: values.playersMax || undefined,
      rounds: values.rounds,
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
          name: '',
          format: formatOptions[0].value,
          playersMin: 2,
          playersMax: '',
          rounds: 1,
        }}
        onSubmit={handleSubmit}
        validationSchema={createLeagueValidationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles['create-league-modal']}>
            <h3>Create new league</h3>
            <FormText
              className={styles['create-league-modal-input']}
              name='name'
              label='Name'
              placeholder='Epic league'
              leaveSpaceForError
            />
            <FormNumber
              className={styles['create-league-modal-input']}
              name='rounds'
              label='Rounds'
              placeholder='1'
              leaveSpaceForError
              min={1}
            />
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
            <FormSelect
              className={styles['create-league-modal-input']}
              name='format'
              label='Format'
              placeholder='Modern, Legacy, ...'
              options={formatOptions}
              leaveSpaceForError
            />
            <div className={styles['create-league-modal-buttons']}>
              <Button disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
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
