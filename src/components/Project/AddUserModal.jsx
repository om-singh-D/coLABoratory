import React, { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios.js'

const AddUserModal = ({ isOpen, onClose, projectId, onUsersAdded }) => {
  const [users, setUsers] = useState([])
  const [selectedUserIds, setSelectedUserIds] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setFetching(true)
      axiosInstance.get('/users/all')
        .then(res => {
          setUsers(res.data.users || [])
        })
        .catch(err => {
          setError('Failed to load users.')
          console.error(err)
        })
        .finally(() => {
          setFetching(false)
        })
    }
  }, [isOpen])

  if (!isOpen) return null

  const toggleUser = (userId) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleAddUsers = async () => {
    if (selectedUserIds.size === 0) return
    
    setLoading(true)
    setError(null)
    
    try {
      const usersArray = Array.from(selectedUserIds)
      await axiosInstance.put('/projects/add-user', {
        projectId,
        users: usersArray
      })
      
      // Successfully added users
      setLoading(false)
      setSelectedUserIds(new Set())
      if (onUsersAdded) onUsersAdded()
      onClose()
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Failed to add users to project.')
      setLoading(false)
    }
  }

  const getInitials = (user) => {
    if (user.name) return user.name.substring(0, 2).toUpperCase()
    if (user.email) return user.email.substring(0, 2).toUpperCase()
    return 'U'
  }

  const getDisplayName = (user) => {
    return user.name || user.email?.split('@')[0] || 'Unknown User'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Add Collaborators</h2>
            <p className="text-sm text-gray-400 mt-1">Select users to add to your project</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm shrink-0">
            {error}
          </div>
        )}

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {fetching ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              No users found.
            </div>
          ) : (
            users.map((user) => {
              const isSelected = selectedUserIds.has(user._id)
              return (
                <div 
                  key={user._id}
                  onClick={() => toggleUser(user._id)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-purple-500/10 border-purple-500/30' 
                      : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {getInitials(user)}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-200 truncate">{getDisplayName(user)}</h3>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  {/* Checkbox/Indicator */}
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-500 text-transparent'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )
            })
          )}
        </div>
        
        {/* Fixed Footer */}
        <div className="p-6 border-t border-white/5 shrink-0 bg-gray-900/50 rounded-b-2xl">
          <button
            onClick={handleAddUsers}
            disabled={loading || selectedUserIds.size === 0}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              `Add ${selectedUserIds.size > 0 ? selectedUserIds.size : ''} Collaborator${selectedUserIds.size !== 1 ? 's' : ''}`
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddUserModal
