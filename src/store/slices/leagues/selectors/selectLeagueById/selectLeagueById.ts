import { createSelector } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import { IRequest } from '../../../../../types/Request'
import { IStoreState } from '../../../../store'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectLeagueById = (id: string) => createSelector<
  IStoreState,
  Record<string, IRequest<ILeague>>,
  ILeague | undefined
>(
  state => state.leagues.byId,
  byId => byId[id]?.data === undefined
    ? undefined
    : byId[id].data!,
)

export default selectLeagueById
