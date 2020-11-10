import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IStoreDispatch } from '../../../store'
import { logout, selectIsLoggedIn, selectUsername } from '../../../store/slices/auth'
import styles from './Navbar.module.css'

const App: React.FC = () => {
  const history = useHistory()
  const dispatch: IStoreDispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const username = useSelector(selectUsername)

  const handleLogout = useCallback(() => {
    dispatch(logout())
      .then(() => { history.replace({ pathname: "/login" }) })
      .catch(() => {/* ignore error */ })
  }, [dispatch, history])

  return (
    <div className={styles['navbar']}>
      {isLoggedIn
        ? (
          <div>
            {`Hello ${username} | `}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )
        : 'Welcome to MTG league'
      }
    </div>
  )
}

export default App
