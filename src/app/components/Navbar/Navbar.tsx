import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { IStoreDispatch } from '../../../store'
import { logout, selectIsLoggedIn, selectUsername } from '../../../store/slices/auth'
import styles from './Navbar.module.css'

const App: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch: IStoreDispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const username = useSelector(selectUsername)

  const handleLogout = useCallback(() => {
    dispatch(logout())
      .then(() => { history.replace({ pathname: "/login" }) })
      .catch(() => { /* ignore error */ })
  }, [dispatch, history])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className={styles['navbar']}>
      {location.pathname === '/'
        ? <div />
        : <Link to='/'>Home</Link>
      }
      <div>
        {'Hello '}
        <b>{username}</b>
        {' | '}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default App
