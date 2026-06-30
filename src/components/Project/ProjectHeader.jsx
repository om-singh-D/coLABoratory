import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectHeader = ({ project }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-white/5 bg-gray-900/50">
      <button 
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="flex-1 flex justify-center">
        <div className="px-4 py-1.5 bg-white/5 rounded-md text-sm text-gray-400 font-medium flex items-center gap-2 border border-white/5">
          workspace <span className="text-gray-600">/</span> <span className="text-gray-200">{project?.name || 'Project'}</span>
        </div>
      </div>
      <div className="flex gap-2">
         <button className="px-4 py-2 bg-purple-500/20 text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
           </svg>
           Share
         </button>
      </div>
    </div>
  )
}

export default ProjectHeader
