import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import RoutePrivate from './components/RoutePrivate'
import RoutePublic from './components/RoutePublic'
import Login from './views/Login'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <RoutePublic path='/login'>
          <Login />
        </RoutePublic>
        <RoutePrivate path='/'>
          OVERVIEW
        </RoutePrivate>
      </Switch>
    </BrowserRouter>
  )
}

export default App
