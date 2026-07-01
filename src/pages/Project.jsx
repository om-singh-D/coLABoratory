import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ProjectHeader from '../components/Project/ProjectHeader'
import TeamSidebar from '../components/Project/TeamSidebar'
import Editor from '../components/Project/Editor'
import AiPanel from '../components/Project/AiPanel'
import axiosInstance from '../config/axios.js'
import { initializeSocket, recieveMessage, sendMessage } from '../config/socket.js'
import UserContext from '../context/user.context.jsx'



function Project() {
  const location = useLocation()
  // Initialize with the project passed from location state
  const [project, setProject] = useState(location.state?.project || null)
  const { user } = useContext(UserContext)
  const [messages, setMessages] = useState(location.state?.project?.messages || []) // Array to store chat messages
  const fetchProjectDetails = useCallback(async () => {
    if (!project?._id) return
    try {
      const res = await axiosInstance.get(`/projects/get-project/${project._id}`)
      if (res.data.project) {
        setProject(res.data.project)
        setMessages(res.data.project.messages || [])
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error)
    }
  }, [project?._id])

  useEffect(() => {
    // Fetch latest project details on mount so that added users don't disappear on reload
    if (project?._id) {
      fetchProjectDetails()
    }
  }, [fetchProjectDetails, project?._id])

  useEffect(() => {
    // Initialize the socket connection
    const socket = initializeSocket(project._id)

    // Listen for incoming messages
    recieveMessage('project-message', data => {
      console.log('New project message:', data)
      setMessages(prev => [...prev, data]) // Append incoming message
    })

    // Cleanup function runs when the component unmounts,
    // or when Strict Mode runs the effect a second time.
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  if (!project) {
    return <div className="h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <ProjectHeader project={project} onProjectUpdate={fetchProjectDetails} />

      {/* Main Layout */}
      <div className="flex-1 grid md:grid-cols-4 overflow-hidden">
        <TeamSidebar 
          users={project?.users || []} 
          messages={messages}
          onSendMessage={(msgText) => {
            // Optimistic update (optional) or just send it
            // We'll just emit it to the server and let the server broadcast
            // But Socket.io broadcast doesn't send to sender, so we append locally
            const newMsg = { id: Date.now(), text: msgText, sender: user.name || user.email?.split('@')[0] || 'Me' };
            setMessages(prev => [...prev, newMsg]);
            
            sendMessage('project-message', {
              id: newMsg.id,
              text: msgText,
              sender: newMsg.sender
            })
          }}
        />
        <Editor projectName={project?.name} />
        <AiPanel projectId={project?._id} />
      </div>
    </div>
  )
}

export default Project