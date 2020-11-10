import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { selectIsLoggedIn } from '../../../store/slices/auth'

interface IRoutePrivateProps {
  children: React.ReactNode
}

const RoutePrivate: React.FC<IRoutePrivateProps & RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <Route
      {...rest}
      render={({ location }) => isLoggedIn
        ? children
        : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
}

export default RoutePrivate
