import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Navbar from './components/Navbar'
import RoutePrivate from './components/RoutePrivate'
import RoutePublic from './components/RoutePublic'
import League from './views/League'
import Login from './views/Login'
import Overview from './views/Overview'

const App: React.FC = () => {
  return (
    <div className={styles['app']}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <RoutePublic path='/login'>
            <Login />
          </RoutePublic>
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
