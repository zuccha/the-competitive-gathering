import { createAsyncThunk } from '@reduxjs/toolkit'
import { IStanding } from '../../../../../types/Standing'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectStandingsOverall from '../../selectors/selectStandingsOverall'

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

const login = createAsyncThunk<
  IStanding[],
  void,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'standingsOverall/fetchStandingsOverall',
  async () => {
    // TODO: Implement once server is ready.
    await wait(500)
    return [
      makeStanding('Alvin', 10, 6, 3, 2, 1, 13, 7, 5, 1),
      makeStanding('Amedeo', 7, 6, 2, 3, 1, 14, 5, 8, 1),
      makeStanding('Camo',   7, 6, 2, 3, 1, 14, 6, 7, 1),
      makeStanding('Galli',  5, 6, 3, 2, 1, 14, 7, 6, 1),
    ]
  },
  {
    condition: (args, { getState }) => {
      const standingsOverall = selectStandingsOverall(getState())
      return standingsOverall.status !== 'loading'
    },
  },
)

export default login
