import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import ProjectHeader from '../components/Project/ProjectHeader'
import TeamSidebar from '../components/Project/TeamSidebar'
import Editor from '../components/Project/Editor'
import AiPanel from '../components/Project/AiPanel'
import axiosInstance from '../config/axios.js'

function Project() {
  const location = useLocation()
  // Initialize with the project passed from location state
  const [project, setProject] = useState(location.state?.project || null)

  const fetchProjectDetails = useCallback(async () => {
    if (!project?._id) return
    try {
      const res = await axiosInstance.get(`/projects/get-project/${project._id}`)
      if (res.data.project) {
        setProject(res.data.project)
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error)
    }
  }, [project?._id])

  if (!project) {
    return <div className="h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <ProjectHeader project={project} onProjectUpdate={fetchProjectDetails} />
      
      {/* Main Layout */}
      <div className="flex-1 grid md:grid-cols-4 overflow-hidden">
        <TeamSidebar users={project?.users || []} />
        <Editor projectName={project?.name} />
        <AiPanel projectId={project?._id} />
      </div>
    </div>
  )
}

export default Project