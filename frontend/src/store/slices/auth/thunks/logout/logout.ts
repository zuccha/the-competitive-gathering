import { createAsyncThunk } from '@reduxjs/toolkit'
import doNothing from '../../../../../utils/doNothing'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectAuthStatus from '../../selectors/selectAuthStatus'

const logout = createAsyncThunk<
  void,
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'auth/logout',
  doNothing,
  {
    condition: (args, { getState }) => {
      const status = selectAuthStatus(getState())
      return status !== 'loading'
    },
  },
)

export default logout
