import React, { useState, useEffect } from 'react'
import axiosInstance from '../../config/axios'

const AiPanel = ({ projectId, fileTree, setFileTree }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const defaultMessages = [
    { id: 1, type: 'suggestion', text: 'I am the AI Agent. I can modify your file structure directly. Ask me to build a component or make a change!' }
  ]

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`ai-agent-${projectId || 'default'}`)
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
    localStorage.setItem(`ai-agent-${projectId || 'default'}`, JSON.stringify(messages))
  }, [messages, projectId])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim()
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await axiosInstance.post('/ai/generate-code', {
        prompt: newMessage.text,
        fileTree
      });

      if (res.data.fileTree) {
        setFileTree(res.data.fileTree);
        
        setMessages(prev => [
          ...prev, 
          { id: Date.now() + 1, type: 'ai', text: "I have successfully modified your files." }
        ])
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: 'ai', text: "Sorry, I encountered an error modifying the files." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-l border-white/5 p-4 hidden md:flex flex-col bg-gray-900/30 overflow-y-auto h-full relative">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">AI Agent</div>
      
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
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="text-xs text-purple-400 font-medium">Gemini Agent</div>
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
        {isLoading && (
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20 text-center animate-pulse">
            <span className="text-xs text-purple-400">Agent is working...</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Agent is typing..." : "Ask Agent to build something..."}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all pr-12 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors p-1.5 rounded-lg hover:bg-purple-500/10 disabled:opacity-50"
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
