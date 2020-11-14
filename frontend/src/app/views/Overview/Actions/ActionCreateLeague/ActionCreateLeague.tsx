import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IStoreDispatch } from '../../../../../store'
import { createLeague } from '../../../../../store/slices/leagues'
import { IApiLeagueInput } from '../../../../../types/ApiLeagueInput'
import { ILeague } from '../../../../../types/League'
import doNothing from '../../../../../utils/doNothing'
import Button from '../../../../components/Button'
import useModal from '../../../../hooks/useModal'
import CreateLeagueModal from './CreateLeagueModal'

const ActionCreateLeague: React.FC = () => {
  const [isModalOpen, openModal, closeModal] = useModal()

  const dispatch: IStoreDispatch = useDispatch()
  const handleCreateLeague = useCallback((league: IApiLeagueInput) => {
    return dispatch(createLeague(league))
  }, [])

  const history = useHistory()
  const navigateToNewLeague = useCallback((league: ILeague) => {
    history.push(`/leagues/${league.id}`)
  }, [history])

  return (
    <>
      <Button onClick={openModal}>
        Create league
      </Button>
      {isModalOpen && (
        <CreateLeagueModal
          onCreateLeague={handleCreateLeague}
          onCreateLeagueSuccess={navigateToNewLeague}
          onCreateLeagueFailure={doNothing}
          onCancel={closeModal}
        />
      )}
    </>
  )
}

export default ActionCreateLeague
