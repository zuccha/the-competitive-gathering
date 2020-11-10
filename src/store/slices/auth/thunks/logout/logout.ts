import { createAsyncThunk } from '@reduxjs/toolkit'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectAuthStatus from '../../selectors/selectAuthStatus'

const logout = createAsyncThunk<
  void,
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'auth/logout',
  async () => {
    // TODO: Implement once server is ready.
    await wait(500)
  },
  {
    condition: (args, { getState }) => {
      const status = selectAuthStatus(getState())
      return status !== 'loading'
    },
  },
)

export default logout
