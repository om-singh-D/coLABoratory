import React from 'react'

const TeamSidebar = ({ users = [] }) => {
  // Predefined colors for avatars
  const colors = [
    'bg-purple-500/20 text-purple-400',
    'bg-cyan-500/20 text-cyan-400',
    'bg-pink-500/20 text-pink-400',
    'bg-green-500/20 text-green-400',
    'bg-blue-500/20 text-blue-400',
    'bg-yellow-500/20 text-yellow-400'
  ]

  const getInitials = (user) => {
    if (!user) return 'U'
    if (typeof user === 'string') return user.substring(0, 2).toUpperCase()
    if (user.name) return user.name.substring(0, 2).toUpperCase()
    if (user.email) return user.email.substring(0, 2).toUpperCase()
    return 'U'
  }

  const getDisplayName = (user) => {
    if (!user) return 'Unknown User'
    if (typeof user === 'string') return `User ${user.substring(0, 4)}`
    return user.name || user.email?.split('@')[0] || 'Unknown User'
  }

  return (
    <div className="border-r border-white/5 p-4 hidden md:flex flex-col bg-gray-900/30 overflow-y-auto">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Team Members</div>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user, i) => (
            <div key={user._id || i} className="flex items-center gap-3 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shadow-sm ${colors[i % colors.length]}`}>
                {getInitials(user)}
              </div>
              <div>
                <div className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
                  {getDisplayName(user)}
                </div>
                <div className="text-xs text-gray-500">
                  Online
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 italic">No active members</div>
        )}
      </div>
    </div>
  )
}

export default TeamSidebar
