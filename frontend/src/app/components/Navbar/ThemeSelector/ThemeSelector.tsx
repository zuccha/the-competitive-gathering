import classnames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import LocalStorage from '../../../../types/LocalStorage'
import Theme, { ITheme } from '../../../../types/Theme'
import styles from './ThemeSelector.module.css'

const white = { primary: '#fffcd5' }
const blue = { primary: '#aae1fa' }
const black = { primary: '#ccc2c0' }
const red = { primary: '#faaa8f' }
const green = { primary: '#9bd3ae' }

const ThemeSelector: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(LocalStorage.readTheme() || white)

  const renderTheme = useCallback((theme: ITheme) => (
    <div
      className={classnames(
        styles['theme-selector-color'],
        Theme.equals(theme, selectedTheme) && styles['selected'],
      )}
      style={{ backgroundColor: theme.primary }}
      onClick={() => setSelectedTheme(theme)}
    />
  ), [selectedTheme])

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', selectedTheme.primary)
    LocalStorage.saveTheme(selectedTheme)
  }, [selectedTheme])

  return (
    <div className={styles['theme-selector']}>
      {renderTheme(white)}
      {renderTheme(blue)}
      {renderTheme(black)}
      {renderTheme(red)}
      {renderTheme(green)}
    </div>
  )
}

export default ThemeSelector
