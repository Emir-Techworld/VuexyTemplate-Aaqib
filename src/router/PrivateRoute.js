// components/PrivateRoute.js
import { Navigate } from 'react-router-dom'
import { getUserData } from '../utility/Utils'

const PrivateRoute = ({ children }) => {
  const user = getUserData()
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
