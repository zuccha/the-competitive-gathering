import validateObject from '../../utils/validateObject'

export type ITheme = {
  primary100: string
  primary200: string
  primary300: string
  primary400: string
  primary500: string
  primary600: string
  primary700: string
  primary800: string
  primary900: string
}

const Theme = {
  equals: (theme1: ITheme, theme2: ITheme): boolean => {
    return theme1.primary100 === theme2.primary100
      && theme1.primary200 === theme2.primary200
      && theme1.primary300 === theme2.primary300
      && theme1.primary400 === theme2.primary400
      && theme1.primary500 === theme2.primary500
      && theme1.primary600 === theme2.primary600
      && theme1.primary700 === theme2.primary700
      && theme1.primary800 === theme2.primary800
      && theme1.primary900 === theme2.primary900
  },
  validate: (maybeTheme: unknown): maybeTheme is ITheme => {
    return validateObject<ITheme>(maybeTheme)
      && typeof maybeTheme.primary100 === 'string'
      && typeof maybeTheme.primary200 === 'string'
      && typeof maybeTheme.primary300 === 'string'
      && typeof maybeTheme.primary400 === 'string'
      && typeof maybeTheme.primary500 === 'string'
      && typeof maybeTheme.primary600 === 'string'
      && typeof maybeTheme.primary700 === 'string'
      && typeof maybeTheme.primary800 === 'string'
      && typeof maybeTheme.primary900 === 'string'
  },
}

export default Theme
