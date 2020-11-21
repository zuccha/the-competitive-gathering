import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiLeague from '../../../../../types/ApiLeague'
import { IApiLeagueInput } from '../../../../../types/ApiLeagueInput'
import { ILeague } from '../../../../../types/League'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const createLeague = createAsyncThunk<
  ILeague,
  IApiLeagueInput,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/createLeague',
  withErrorHttp(async apiLeagueInput => {
    const { data } = await api.post('leagues/', apiLeagueInput)
    return ApiLeague.toLeague(data)
  }),
)

export default createLeague
