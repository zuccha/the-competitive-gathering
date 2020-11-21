import classnames from 'classnames'
import React, { useCallback, useState } from 'react'
import Palette from '../../../../theme/Palette'
import ThemeManager from '../../../../theme/ThemeManager'
import Theme, { ITheme } from '../../../../types/Theme'
import styles from './ThemeSelector.module.css'

const ThemeSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(ThemeManager.getCurrent())

  const renderTheme = useCallback((theme: ITheme) => (
    <div
      className={classnames(
        styles['theme-selector-color'],
        Theme.equals(theme, selectedTheme) && styles['selected'],
      )}
      style={{ backgroundColor: theme.primary100 }}
      onClick={() => {
        ThemeManager.update(theme)
        setSelectedTheme(theme)
      }}
    />
  ), [selectedTheme])

  return (
    <div className={styles['theme-selector']}>
      {renderTheme(Palette.White)}
      {renderTheme(Palette.Blue)}
      {renderTheme(Palette.Black)}
      {renderTheme(Palette.Red)}
      {renderTheme(Palette.Green)}
    </div>
  )
}

export default ThemeSelector
