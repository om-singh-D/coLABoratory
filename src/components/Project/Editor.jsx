import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

const Editor = ({ projectName }) => {
  const [content, setContent] = useState(`# ${projectName || 'Project Alpha'}\n\nBuilding the future of collaboration\n\n## Features\n- Real-time editing\n- AI assistance\n- Team chat`)

  return (
    <div className="md:col-span-2 flex flex-col bg-gray-950 relative h-full">
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-gray-900/20">
        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-gray-300 font-medium text-sm">Project Overview.md</span>
      </div>
      
      <div className="flex-1 overflow-auto bg-[#282c34]">
        <CodeMirror
          value={content}
          height="100%"
          theme={oneDark}
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={(val) => setContent(val)}
          className="text-sm h-full min-h-[500px]"
        />
      </div>
    </div>
  )
}

export default Editor
