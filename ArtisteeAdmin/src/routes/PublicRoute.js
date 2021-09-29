import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLogin} from '../utils/localstorage'

const PublicRoute = ({component: Component, path, ...rest}) => {
  if (path === '/signin')
    return (
      <Route
        {...rest}
        render={props =>
          isLogin() ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    )
  return <Route {...rest} render={props => <Component {...props} />} />
}

export default PublicRoute
