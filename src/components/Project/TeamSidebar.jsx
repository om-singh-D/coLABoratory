import React, { useState } from 'react'

const TeamSidebar = ({ users = [], messages = [], onSendMessage }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    
    if (onSendMessage) {
      onSendMessage(input)
    }
    
    setInput('')
  }

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
    <div className="border-r border-white/5 relative hidden md:flex flex-col bg-gray-900/30 overflow-hidden h-full">
      {/* Main View (Default State): Vertical chat container */}
      <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gray-900/50">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Team Chat</span>
          <button 
            onClick={() => setIsOverlayOpen(true)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer border border-white/5"
            title="View Collaborators"
          >
            {users.length > 0 ? getInitials(users[0]) : 'U'}
          </button>
        </div>

        {/* Body: Scrollable area for chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-xs text-gray-500 italic text-center mt-10">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <span className="font-semibold text-gray-400 mr-2">{msg.sender}:</span>
                <span className="text-gray-200 break-words">{msg.text}</span>
              </div>
            ))
          )}
        </div>

        {/* Footer: Text input field and Send button */}
        <div className="p-3 border-t border-white/5 bg-gray-900/50">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors font-medium"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Overlay/Modal State (Collaborators List) */}
      {isOverlayOpen && (
        <div className="absolute inset-0 bg-[#111827] flex flex-col z-10">
          {/* Top header with 'X' close button */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gray-900/50">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Collaborators</span>
            <button 
              onClick={() => setIsOverlayOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Dynamic list of user rows */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {users.length > 0 ? (
              users.map((user, i) => (
                <div key={user._id || i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shadow-sm ${colors[i % colors.length]}`}>
                    {getInitials(user)}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    {getDisplayName(user)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">No active members</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamSidebar
