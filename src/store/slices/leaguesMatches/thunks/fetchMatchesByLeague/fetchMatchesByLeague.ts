import { createAsyncThunk } from '@reduxjs/toolkit'
import ErrorHttp from '../../../../../types/ErrorHttp'
import { IMatch } from '../../../../../types/Match'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectGetLeagueMatches from '../../selectors/selectGetLeagueMatches'

const makeMatch = (
  id: string,
  username1: string,
  username2: string,
  gamesWonByUsername1?: number,
  gamesWonByUsername2?: number,
  gamesDraw?: number,
): IMatch => ({
  id,
  username1,
  username2,
  results: gamesDraw === undefined
    ? undefined
    : {
      gamesWonByUsername1: gamesWonByUsername1!,
      gamesWonByUsername2: gamesWonByUsername2!,
      gamesDraw: gamesDraw!,
    },
})

const fetchMatchesByLeague = createAsyncThunk<
  IMatch[],
  string,
  { state: IStoreState, dispatch: IStoreDispatch }
>(
  'leaguesMatches/fetchMatchesByLeague',
  async id => {
    // TODO: Implement once server is ready.
    await wait(500)
    if (['1', '2', '3', '4', '5'].includes(id)) {
      return [
        makeMatch('1', 'Alvin', 'Ame',   1, 1, 0),
        makeMatch('2', 'Ame',   'Camo'),
        makeMatch('3', 'Camo',  'Galli'),
        makeMatch('4', 'Galli', 'Alvin', 2, 0, 0),
        makeMatch('5', 'Ame',   'Alvin', 1, 1, 1),
        makeMatch('6', 'Camo',  'Ame',   2, 1, 0),
        makeMatch('7', 'Galli', 'Camo'),
        makeMatch('8', 'Alvin', 'Galli'),
      ]
    }
    throw new ErrorHttp('404')
  },
  {
    condition: (id, { getState }) => {
      const leagueMatches = selectGetLeagueMatches(getState())(id)
      return leagueMatches.status !== 'loading'
    },
  },
)

export default fetchMatchesByLeague
