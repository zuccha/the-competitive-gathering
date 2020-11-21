import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectAuthStatus from '../../selectors/selectAuthStatus'

const login = createAsyncThunk<
  { username: string, token: string },
  { username: string, password: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'auth/login',
  withErrorHttp(async ({ username, password }) => {
    const { data } = await api.post('/login/', {
      username,
      password,
    })
    return { username, token: data.token }
  }),
  {
    condition: (args, { getState }) => {
      const status = selectAuthStatus(getState())
      return status !== 'loading'
    },
  },
)

export default login
