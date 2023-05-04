import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "../firebase"

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState(0)
  const [dbMonth, setDbMonth] = useState(0)
  const [dateResponse, setDateResponse] = useState()
  const [timestamps, setTimestamps] = useState()
  const [globalDate, setGlobalDate] = useState()

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        globalDate,
        setGlobalDate,
        timestamps,
        setTimestamps,
        dateResponse,
        setDateResponse,
        createUser,
        user,
        logout,
        signIn,
        userInfo,
        setUserInfo,
        dbMonth,
        setDbMonth
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
