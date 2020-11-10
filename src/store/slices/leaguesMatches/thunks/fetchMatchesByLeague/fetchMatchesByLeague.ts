import { createAsyncThunk } from '@reduxjs/toolkit'
import ErrorHttp from '../../../../../types/ErrorHttp'
import { IMatch } from '../../../../../types/Match'
import wait from '../../../../../utils/wait'
import { IStoreDispatch, IStoreState } from '../../../../store'
import selectGetLeagueMatches from '../../selectors/selectGetLeagueMatches'

const makeMatch = (
  username1: string,
  username2: string,
  gamesWonByUsername1?: number,
  gamesWonByUsername2?: number,
  gamesDraw?: number,
): IMatch => ({
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
        makeMatch('Alvin', 'Ame',   1, 1, 0),
        makeMatch('Ame',   'Camo'),
        makeMatch('Camo',  'Galli'),
        makeMatch('Galli', 'Alvin', 2, 0, 0),
        makeMatch('Ame',   'Alvin', 1, 1, 1),
        makeMatch('Camo',  'Ame',   2, 1, 0),
        makeMatch('Galli', 'Camo'),
        makeMatch('Alvin', 'Galli'),
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
