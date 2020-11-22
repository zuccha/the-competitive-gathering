import React, { useLayoutEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import ThemeManager from '../types/ThemeManager'
import styles from './App.module.css'
import Navbar from './components/Navbar'
import RoutePrivate from './components/RoutePrivate'
import RoutePublic from './components/RoutePublic'
import League from './views/League'
import Login from './views/Login'
import Overview from './views/Overview'
import Settings from './views/Settings'

const App: React.FC = () => {
  useLayoutEffect(() => {
    ThemeManager.load()
  }, [])

  return (
    <div className={styles['app']}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <RoutePublic path='/login'>
            <Login />
          </RoutePublic>
          <RoutePrivate path='/settings'>
            <Settings />
          </RoutePrivate>
          <RoutePrivate path='/leagues/:id'>
            <League />
          </RoutePrivate>
          <RoutePrivate path='/'>
            <Overview />
          </RoutePrivate>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
