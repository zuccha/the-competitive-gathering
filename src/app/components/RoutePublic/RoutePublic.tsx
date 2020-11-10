import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { selectIsLoggedIn } from '../../../store/slices/auth'

interface IRoutePublicProps {
  children: React.ReactNode
}

const RoutePublic: React.FC<IRoutePublicProps & RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <Route
      {...rest}
      render={({ location }) => isLoggedIn
        ? <Redirect to={{ pathname: "/", state: { from: location } }} />
        : children
      }
    />
  );
}

export default RoutePublic
