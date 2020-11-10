import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStanding } from '../../../../../types/Standing'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectOverallStandings from '../../selectors/selectOverallStandings'

const makeStanding = (
  username: string,
  pts: number,
  mp: number,
  mw: number,
  ml: number,
  md: number,
  gp: number,
  gw: number,
  gl: number,
  gd: number,
): IStanding => ({
  username,
  points: pts,
  matchesPlayed: mp,
  matchesWon: mw,
  matchesLost: ml,
  matchesDraw: md,
  gamesPlayed: gp,
  gamesWon: gw,
  gamesLost: gl,
  gamesDraw: gd,
})

const fetchOverallStandings = createAsyncThunk<
  IStanding[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'overallStandings/fetchOverallStandings',
  async () => {
    // TODO: Implement once server is ready.
    await wait(500)
    return [
      makeStanding('Alvin', 10, 6, 3, 2, 1, 13, 7, 5, 1),
      makeStanding('Ame', 7, 6, 2, 3, 1, 14, 5, 8, 1),
      makeStanding('Camo',   7, 6, 2, 3, 1, 14, 6, 7, 1),
      makeStanding('Galli',  5, 6, 3, 2, 1, 14, 7, 6, 1),
    ]
  },
  {
    condition: (args, { getState }) => {
      const overallStandings = selectOverallStandings(getState())
      return overallStandings.status !== 'loading'
    },
  },
)

export default fetchOverallStandings
