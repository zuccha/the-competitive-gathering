import ErrorHttp from '../../types/ErrorHttp'

const withErrorHttp = <A, R>(callback: (arg: A) => Promise<R>): (arg: A) => Promise<R> => {
  return arg => callback(arg)
    .then(response => response)
    .catch(error => {
      const status = error.response.status
      throw new ErrorHttp(`${status}`)
    })
}

export default withErrorHttp
