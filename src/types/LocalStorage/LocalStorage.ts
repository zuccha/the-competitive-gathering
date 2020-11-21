import { ICredentials } from '../Credentials'
import Theme, { ITheme } from '../Theme'

const readSafe = <T>(key: string, validate: (item: unknown) => boolean ): T | undefined => {
  const itemStr = localStorage.getItem(key)
    if (itemStr === null) {
      return undefined
    }

    try {
      const item = JSON.parse(itemStr)
      return validate(item)
        ? item
        : undefined
    } catch {
      return undefined
    }
}

const LocalStorage = {
  readCredentials: (): ICredentials | undefined => {
    return readSafe('credentials', maybeCredentials => {
      const credentials = maybeCredentials as ICredentials
      return typeof credentials.username === 'string' && typeof credentials.token === 'string'
    })
  },
  saveCredentials: (credentials: ICredentials | undefined): void => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  },
  readTheme: (): ITheme | undefined => {
    return readSafe('theme', Theme.validate)
  },
  saveTheme: (theme: ITheme | undefined): void => {
    localStorage.setItem('theme', JSON.stringify(theme))
  },
}

export default LocalStorage
