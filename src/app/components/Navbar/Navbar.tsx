import React, { useCallback } from 'react'
import { MdSettings } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { IStoreDispatch } from '../../../store'
import { logout, selectIsLoggedIn, selectUsername } from '../../../store/slices/auth'
import Button from '../Button'
import ButtonIcon from '../ButtonIcon'
import styles from './Navbar.module.css'
import ThemeSelector from './ThemeSelector'

const App: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch: IStoreDispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const username = useSelector(selectUsername)

  const handleLogout = useCallback(() => {
    dispatch(logout())
      .then(() => { history.replace({ pathname: '/login' }) })
      .catch(() => { /* ignore error */ })
  }, [dispatch, history])

  const handleNavigateSettings = useCallback(() => {
    history.replace({ pathname: '/settings' })
  }, [history])

  if (!isLoggedIn) {
    return (
      <div className={styles['navbar']}>
        <div />
        <ThemeSelector />
      </div>
    )
  }

  return (
    <div className={styles['navbar']}>
      {location.pathname === '/'
        ? <div />
        : <Link to='/'>Home</Link>
      }
      <div className={styles['navbar-right']}>
        <span>{'Hello '}<b>{username}</b></span>
        <span className={styles['navbar-separator']}>|</span>
        <ThemeSelector />
        <span className={styles['navbar-separator']}>|</span>
        <ButtonIcon onClick={handleNavigateSettings}><MdSettings /></ButtonIcon>
        <span className={styles['navbar-separator']}>|</span>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default App
