import { createAsyncThunk } from '@reduxjs/toolkit'
import ErrorHttp from '../../../../../types/ErrorHttp'
import { ILeague } from '../../../../../types/League'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'

const createLeague = createAsyncThunk<
  ILeague,
  ILeague,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/createLeague',
  async league => {
    // TODO: Implement once server is ready.
    await wait(500)
    if (league.format === '400') {
      throw new ErrorHttp('400')
    }
    if (league.format === '403') {
      throw new ErrorHttp('403')
    }
    if (league.format === '500') {
      throw new ErrorHttp('500')
    }
    return {
      ...league,
      id: '1',
    }
  },
)

export default createLeague
