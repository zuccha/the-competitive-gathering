import { createAsyncThunk } from '@reduxjs/toolkit'
import ErrorHttp from '../../../../../types/ErrorHttp'
import { IMatch } from '../../../../../types/Match'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'

const registerMatchResult = createAsyncThunk<
  void,
  { leagueId: string, match: IMatch },
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'matches/registerMatchResult',
  async ({ /* leagueId, */ match }) => {
    // TODO: Implement once server is ready.
    await wait(500)
    if (match.id === '2') {
      throw new ErrorHttp('400')
    }
    if (match.id === '3') {
      throw new ErrorHttp('403')
    }
    if (match.id === '7') {
      throw new ErrorHttp('500')
    }
  },
)

export default registerMatchResult
