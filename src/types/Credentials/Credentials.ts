import validateObject from '../../utils/validateObject'

export type ICredentials = {
  username: string
  token: string
}

const Credentials = {
  validate: (maybeCredentials: unknown): maybeCredentials is ICredentials => {
    return validateObject<ICredentials>(maybeCredentials)
      && typeof maybeCredentials.username === 'string'
      && typeof maybeCredentials.token === 'string'
  },
}

export default Credentials
