import React from 'react'
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import RoutePrivate from './components/RoutePrivate'
import RoutePublic from './components/RoutePublic';
import Login from './views/Login'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
      </div>
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
