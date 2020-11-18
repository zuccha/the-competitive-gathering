export type ITheme = {
  primary: string
}

const Theme = {
  equals: (theme1: ITheme, theme2: ITheme): boolean => {
    return theme1.primary === theme2.primary
  },
}

export default Theme
