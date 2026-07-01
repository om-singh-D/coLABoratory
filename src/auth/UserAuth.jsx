import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/user.context.jsx'

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !user) {
      navigate('/login')
    } else {
      setLoading(false)
    }
  }, [user, token, navigate])

  if (loading) {
    return <div className="h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <>{children}</>
  )
}

export default UserAuth
