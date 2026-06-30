import React, { useState, useEffect } from 'react'

const AiPanel = ({ projectId }) => {
  const [input, setInput] = useState('')
  
  // Default messages if local storage is empty
  const defaultMessages = [
    { id: 1, type: 'suggestion', text: 'Consider adding error handling to the API endpoint to improve reliability.' },
    { id: 2, type: 'ai', text: 'I can help optimize this function. Would you like me to suggest improvements?' }
  ]

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`ai-chat-${projectId || 'default'}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return defaultMessages
      }
    }
    return defaultMessages
  })

  useEffect(() => {
    localStorage.setItem(`ai-chat-${projectId || 'default'}`, JSON.stringify(messages))
  }, [messages, projectId])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim()
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: 'ai', text: "That sounds like a great idea! I can help you implement that. What specific part would you like to focus on?" }
      ])
    }, 1000)
  }

  return (
    <div className="border-l border-white/5 p-4 hidden md:flex flex-col bg-gray-900/30 overflow-y-auto h-full">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">AI Assistant</div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-4">
        {messages.map(msg => {
          if (msg.type === 'suggestion') {
            return (
              <div key={msg.id} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-xs text-gray-500 mb-2 font-medium">Suggestion</div>
                <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
              </div>
            )
          } else if (msg.type === 'ai') {
            return (
              <div key={msg.id} className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="text-xs text-purple-400 font-medium">Gemini AI</div>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">{msg.text}</p>
              </div>
            )
          } else {
            return (
              <div key={msg.id} className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-right ml-8">
                <div className="text-xs text-blue-400 mb-2 font-medium">You</div>
                <p className="text-sm text-gray-200 leading-relaxed">{msg.text}</p>
              </div>
            )
          }
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI for help..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all pr-12"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors p-1.5 rounded-lg hover:bg-purple-500/10 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AiPanel
