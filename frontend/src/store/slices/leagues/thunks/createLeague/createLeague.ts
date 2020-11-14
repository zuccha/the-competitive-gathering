import { createAsyncThunk } from '@reduxjs/toolkit'
import { IApiLeagueInput } from '../../../../../types/ApiLeagueInput'
import ErrorHttp from '../../../../../types/ErrorHttp'
import { ILeague } from '../../../../../types/League'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'

const createLeague = createAsyncThunk<
  ILeague,
  IApiLeagueInput,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/createLeague',
  async apiLeagueInput => {
    // TODO: Implement once server is ready.
    await wait(500)
    if (apiLeagueInput.format === 'MODERN') {
      throw new ErrorHttp('400')
    }
    if (apiLeagueInput.format === 'LEGACY') {
      throw new ErrorHttp('403')
    }
    if (apiLeagueInput.format === 'VINTAGE') {
      throw new ErrorHttp('500')
    }
    return {
      id: '1',
      creator: apiLeagueInput.creator,
      players: apiLeagueInput.players,
      status: 'PENDING',
      format: apiLeagueInput.format,
      dateStart: undefined,
      dateEnd: undefined,
      playersMin: apiLeagueInput.players_min,
      playersMax: apiLeagueInput.players_max,
      rounds: apiLeagueInput.rounds,
    }
  },
)

export default createLeague
