import { DefaultRoute } from '../router/routes'

// A constant for the localStorage key to avoid magic strings.
const USER_DATA_KEY = 'userData'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

/**
 * A robust function to get user data from localStorage.
 * It handles parsing errors and checks for token expiration.
 * If data is invalid or expired, it clears localStorage and returns null.
 * @returns {object|null} The user data object or null.
 */
export const getUserData = () => {
  const userDataString = localStorage.getItem(USER_DATA_KEY)
  if (!userDataString) {
    return null
  }

  try {
    const userData = JSON.parse(userDataString)
    const { token, expiration } = userData

    // Check for essential properties
    if (!token || !expiration) {
      localStorage.removeItem(USER_DATA_KEY)
      return null
    }

    // Check if the token is expired
    const expirationTime = new Date(expiration).getTime()
    if (new Date().getTime() > expirationTime) {
      localStorage.removeItem(USER_DATA_KEY) // Clean up expired token
      return null
    }

    return userData
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error)
    localStorage.removeItem(USER_DATA_KEY) // Clean up corrupted data
    return null
  }
}

export const isUserLoggedIn = () => {
  return !!getUserData()
}

export const getHomeRouteForLoggedInUser = () => {
  return isUserLoggedIn() ? DefaultRoute : '/login'
}