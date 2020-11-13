import classnames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './ThemeSelector.module.css'

const white = '#fffcd5'
const blue = '#aae1fa'
const black = '#ccc2c0'
const red = '#faaa8f'
const green = '#9bd3ae'

const ThemeSelector: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('theme-color') || white)

  const renderColor = useCallback((color: string) => (
    <div
      className={classnames(
        styles['theme-selector-color'],
        color === selectedColor && styles['selected'],
      )}
      style={{ backgroundColor: color }}
      onClick={() => setSelectedColor(color)}
    />
  ), [selectedColor])

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', selectedColor)
    localStorage.setItem('theme-color', selectedColor)
  }, [selectedColor])

  return (
    <div className={styles['theme-selector']}>
      {renderColor(white)}
      {renderColor(blue)}
      {renderColor(black)}
      {renderColor(red)}
      {renderColor(green)}
    </div>
  )
}

export default ThemeSelector
