import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

export const isUserLoggedIn = () => localStorage.getItem('userData')

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const getHomeRouteForLoggedInUser = () => {

  console.log("getHomeRouteForLoggedInUser called");

  const userData = JSON.parse(localStorage.getItem('userData'))

  if (!userData || !userData.token || !userData.expiration) return '/login'

  const currentTime = new Date().getTime()
  const expirationTime = new Date(userData.expiration).getTime()

  return expirationTime > currentTime ? DefaultRoute : '/login'
}