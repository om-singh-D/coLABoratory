import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'
import Markdown from 'markdown-to-jsx'

const Editor = ({ projectName, fileTree = {}, setFileTree, activeFile, setActiveFile }) => {
  const [isPreview, setIsPreview] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [showNewFileInput, setShowNewFileInput] = useState(false)
  
  // Create a new file
  const handleCreateFile = (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    
    const newTree = {
      ...fileTree,
      [newItemName]: {
        file: {
          contents: ""
        }
      }
    }
    setFileTree(newTree)
    setNewItemName('')
    setShowNewFileInput(false)
    setActiveFile(newItemName)
  }

  // Edit current file
  const handleContentChange = (val) => {
    if (!activeFile) return
    const newTree = {
      ...fileTree,
      [activeFile]: {
        file: {
          contents: val
        }
      }
    }
    setFileTree(newTree)
  }

  // Render File Explorer if no active file
  if (!activeFile) {
    return (
      <div className="md:col-span-2 flex flex-col bg-gray-950 relative h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gray-900/20">
          <span className="text-gray-300 font-medium text-sm">Files - {projectName}</span>
          <button 
            onClick={() => setShowNewFileInput(true)}
            className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors"
          >
            + New File
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {showNewFileInput && (
            <form onSubmit={handleCreateFile} className="mb-4">
              <input 
                autoFocus
                type="text" 
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                placeholder="e.g. src/components/App.jsx"
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
              />
            </form>
          )}

          {Object.keys(fileTree || {}).length === 0 && !showNewFileInput ? (
            <div className="text-xs text-gray-500 italic text-center mt-10">No files yet. Create one to get started!</div>
          ) : (
            Object.keys(fileTree || {}).map(path => (
              <div 
                key={path} 
                onClick={() => {
                  setActiveFile(path);
                  setIsPreview(false); // Reset preview mode
                }}
                className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{path}</span>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  // Render Editor if active file exists
  const isMarkdown = activeFile.endsWith('.md')
  const content = fileTree[activeFile]?.file?.contents || ''

  return (
    <div className="md:col-span-2 flex flex-col bg-gray-950 relative h-full">
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gray-900/20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveFile(null)}
            className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span className="text-gray-300 font-medium text-sm">{activeFile}</span>
        </div>
        
        {isMarkdown && (
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="text-xs bg-white/5 text-gray-300 px-3 py-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-auto bg-[#282c34]">
        {isPreview && isMarkdown ? (
          <div className="p-6 prose prose-invert max-w-none text-gray-300">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <CodeMirror
            value={content}
            height="100%"
            theme={vscodeDark}
            extensions={[
              isMarkdown 
                ? markdown({ base: markdownLanguage }) 
                : loadLanguage(activeFile.split('.').pop()) || []
            ]}
            onChange={handleContentChange}
            className="text-sm h-full min-h-[500px]"
          />
        )}
      </div>
    </div>
  )
}

export default Editor
