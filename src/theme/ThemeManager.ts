import LocalStorage from '../types/LocalStorage'
import { ITheme } from '../types/Theme'
import Palette from './Palette'

const ThemeManager = {
  getCurrent: (): ITheme => {
    return LocalStorage.readTheme() || Palette.White
  },
  load: (): void => {
    const theme = LocalStorage.readTheme() || Palette.White
    document.documentElement.style.setProperty('--color-primary-100', theme.primary100)
    document.documentElement.style.setProperty('--color-primary-200', theme.primary200)
    document.documentElement.style.setProperty('--color-primary-300', theme.primary300)
    document.documentElement.style.setProperty('--color-primary-400', theme.primary400)
    document.documentElement.style.setProperty('--color-primary-500', theme.primary500)
    document.documentElement.style.setProperty('--color-primary-600', theme.primary600)
    document.documentElement.style.setProperty('--color-primary-700', theme.primary700)
    document.documentElement.style.setProperty('--color-primary-800', theme.primary800)
    document.documentElement.style.setProperty('--color-primary-900', theme.primary900)
  },
  save: (theme: ITheme): void => {
    LocalStorage.saveTheme(theme)
  },
  update: (theme: ITheme): void => {
    ThemeManager.save(theme)
    ThemeManager.load()
  },
}

export default ThemeManager
