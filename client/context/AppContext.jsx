import { createContext } from 'react'
import { useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
      const backendURL = import .meta.env.VITE_BACKEND_URL 
      const [isLoggedIn, setIsLoggedIn] = useState(false)
      const [userData, setUserData] = useState(false)


      const value  = {
            backendURL,
            isLoggedIn, setIsLoggedIn,
            userData, setUserData
      }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}