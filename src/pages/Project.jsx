import React from 'react'
import { useLocation } from 'react-router-dom'
import ProjectHeader from '../components/Project/ProjectHeader'
import TeamSidebar from '../components/Project/TeamSidebar'
import Editor from '../components/Project/Editor'
import AiPanel from '../components/Project/AiPanel'

function Project() {
  const location = useLocation()
  const project = location.state?.project

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <ProjectHeader project={project} />
      
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