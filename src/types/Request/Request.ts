import { IRequestStatus } from '../RequestStatus'

export interface IRequest<T> {
  status: IRequestStatus,
  data: T | undefined,
}

const Request = {
  makeInitial: <T>(): IRequest<T> => ({
    status: 'initial',
    data: undefined,
  }),
  makeLoading: <T>(): IRequest<T> => ({
    status: 'loading',
    data: undefined,
  }),
  makeFailure: <T>(): IRequest<T> => ({
    status: 'failure',
    data: undefined,
  }),
  makeSuccess: <T>(data: T): IRequest<T> => ({
    status: 'success',
    data,
  }),
  mergeStatuses: (...statuses: IRequestStatus[]): IRequestStatus => {
    if (statuses.some(status => status === 'initial')) {
      return 'initial'
    }
    if (statuses.some(status => status === 'loading')) {
      return 'loading'
    }
    if (statuses.some(status => status === 'failure')) {
      return 'failure'
    }
    return 'success'
  },
}

export default Request
