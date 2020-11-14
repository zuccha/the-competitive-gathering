import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStoreDispatch, IStoreState } from '../../../../../..'
import ApiMatch from '../../../../../../../types/ApiMatch'
import { IMatch } from '../../../../../../../types/Match'
import withErrorHttp from '../../../../../../../utils/withErrorHttp'
import api from '../../../../../../api'
import selectMatchesStatus from '../../selectors/selectMatchesStatus'

const fetchMatches = createAsyncThunk<
  IMatch[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'matches/ids/fetchMatches',
  withErrorHttp(async () => {
    const { data } = await api.get('/matches')
    return data.map(ApiMatch.toMatch)
  }),
  {
    condition: (args, { getState }) => {
      const status = selectMatchesStatus(getState())
      return status !== 'loading'
    },
  },
)

export default fetchMatches
