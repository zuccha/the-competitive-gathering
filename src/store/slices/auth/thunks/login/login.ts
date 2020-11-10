import { createAsyncThunk } from '@reduxjs/toolkit'
import ErrorHttp from '../../../../../types/ErrorHttp'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectAuthStatus from '../../selectors/selectAuthStatus'

const login = createAsyncThunk<
  { username: string, token: string },
  { username: string, password: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'auth/login',
  async ({ username /*, password */ }) => {
    // TODO: Implement once server is ready.
    await wait(500)
    if (username === '401') { throw new ErrorHttp('401') }
    if (username === '500') { throw new ErrorHttp('500') }
    return { username, token: 'token' }
  },
  {
    condition: (args, { getState }) => {
      const status = selectAuthStatus(getState())
      return status !== 'loading'
    },
  },
)

export default login
