import React, { createContext, useState } from 'react'

const UserContext = createContext()

// Initialize user from localStorage
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')
  if (storedUser && storedToken) {
    try {
      return JSON.parse(storedUser)
    } catch {
      return null
    }
  }
  return null
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser)

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token')
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
