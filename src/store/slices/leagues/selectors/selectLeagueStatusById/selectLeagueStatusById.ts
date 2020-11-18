import { createSelector } from '@reduxjs/toolkit'
import { ILeague } from '../../../../../types/League'
import { IRequest } from '../../../../../types/Request'
import { IRequestStatus } from '../../../../../types/RequestStatus'
import { IStoreState } from '../../../../store'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const selectLeagueStatusById = (id: string) => createSelector<
  IStoreState,
  Record<string, IRequest<ILeague>>,
  IRequestStatus
>(
  state => state.leagues.byId,
  byId => byId[id] === undefined
    ? 'initial'
    : byId[id].status,
)

export default selectLeagueStatusById
