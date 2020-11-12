import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMatch } from '../../../../../types/Match'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'

const registerMatchResult = createAsyncThunk<
  void,
  IMatch,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leaguesMatches/registerMatchResult',
  async (/* match */) => {
    // TODO: Implement once server is ready.
    await wait(500)
  },
)

export default registerMatchResult
