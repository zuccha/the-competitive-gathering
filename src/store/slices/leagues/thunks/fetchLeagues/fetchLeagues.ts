import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectLeagues from '../../selectors/selectLeagues'

const fetchLeagues = createAsyncThunk<
  ILeague[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leagues/fetchLeagues',
  async () => {
    // TODO: Implement once server is ready.
    await wait(500)
    return [
      { id: '1', format: 'Modern', dateStart: '2020-08-01', dateEnd: '2020-08-31', playersMin: 2, playersMax: undefined },
      { id: '2', format: 'Modern', dateStart: '2020-09-01', dateEnd: '2020-09-30', playersMin: 3, playersMax: 4 },
      { id: '3', format: 'Legacy', dateStart: '2020-09-15', dateEnd: '2020-10-14', playersMin: 2, playersMax: 4 },
      { id: '4', format: 'Modern', dateStart: '2020-10-01', dateEnd: '2020-10-31', playersMin: 4, playersMax: undefined },
      { id: '5', format: 'Modern', dateStart: '2020-11-01', dateEnd: undefined,    playersMin: 2, playersMax: undefined },
    ]
  },
  {
    condition: (args, { getState }) => {
      const leagues = selectLeagues(getState())
      return leagues.status !== 'loading'
    },
  },
)

export default fetchLeagues
