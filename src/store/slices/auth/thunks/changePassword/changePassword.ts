import { createAsyncThunk } from '@reduxjs/toolkit'
import withErrorHttp from '../../../../../utils/withErrorHttp'
import api from '../../../../api'
import { IStoreDispatch, IStoreState } from '../../../../store'

const changePassword = createAsyncThunk<
  void,
  { username: string, passwordOld: string, passwordNew: string },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'auth/changePassword',
  withErrorHttp(async ({ username, passwordOld, passwordNew }) => {
    await api.put(`user/${username}/password/`, {
      password_old: passwordOld,
      password_new: passwordNew,
    })
  }),
)

export default changePassword
