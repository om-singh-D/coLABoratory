import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'
import Markdown from 'markdown-to-jsx'
import { getFileContents, setFileContents, renameNode, flattenTreeForRendering } from '../../utils/fileSystem.js'

const Editor = ({ projectName, fileTree = {}, setFileTree, activeFile, setActiveFile }) => {
  const [isPreview, setIsPreview] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [showNewFileInput, setShowNewFileInput] = useState(false)
  const [renamingPath, setRenamingPath] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  
  // Create a new file
  const handleCreateFile = (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    
    // Support creating folders by passing trailing slash, or nested files
    const newTree = setFileContents(fileTree, newItemName, "")
    
    setFileTree(newTree)
    setNewItemName('')
    setShowNewFileInput(false)
    setActiveFile(newItemName)
  }

  // Edit current file
  const handleContentChange = (val) => {
    if (!activeFile) return
    const newTree = setFileContents(fileTree, activeFile, val)
    setFileTree(newTree)
  }

  // Handle renaming files or folders
  const handleRenameSubmit = (e, oldPath, isFolder) => {
    e.preventDefault()
    if (!renameValue.trim() || renameValue === oldPath) {
      setRenamingPath(null)
      return
    }

    const parts = oldPath.split('/')
    const oldName = parts[parts.length - 1]
    const newName = renameValue.includes('/') ? renameValue.split('/').pop() : renameValue // Just the final name segment

    const newTree = renameNode(fileTree, oldPath, newName)
    setFileTree(newTree)
    setRenamingPath(null)
    
    // Update activeFile if it was the renamed file or inside the renamed folder
    if (activeFile && activeFile.startsWith(oldPath)) {
       setActiveFile(activeFile.replace(oldPath, oldPath.slice(0, oldPath.length - oldName.length) + newName))
    }
  }

  // Render File Explorer if no active file
  if (!activeFile) {
    const renderTree = (nodes, depth = 0) => {
      return nodes.map(item => (
        <div key={item.path}>
          <div 
            className={`flex items-center justify-between py-1.5 rounded hover:bg-white/5 transition-colors group ${!item.isFolder ? 'cursor-pointer' : ''}`}
            style={{ paddingLeft: `${depth * 16 + 8}px`, paddingRight: '8px' }}
          >
            <div 
              className="flex items-center gap-2 flex-1"
              onClick={() => {
                if (!item.isFolder && renamingPath !== item.path) {
                  setActiveFile(item.path);
                  setIsPreview(false);
                }
              }}
            >
              {item.isFolder ? (
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              
              {renamingPath === item.path ? (
                <form onSubmit={(e) => handleRenameSubmit(e, item.path, item.isFolder)} className="flex-1 mr-2">
                  <input 
                    autoFocus
                    type="text" 
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onBlur={(e) => handleRenameSubmit(e, item.path, item.isFolder)}
                    className="w-full bg-white/10 border border-purple-500/50 rounded px-1.5 py-0.5 text-sm text-white focus:outline-none"
                  />
                </form>
              ) : (
                <span className={`text-sm truncate ${item.isFolder ? 'text-gray-400 font-medium' : 'text-gray-300 group-hover:text-white'} transition-colors`}>{item.name}</span>
              )}
            </div>

            {renamingPath !== item.path && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setRenamingPath(item.path);
                  setRenameValue(item.path);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-white transition-all rounded hover:bg-white/10"
                title="Rename"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
          {item.isFolder && item.children.length > 0 && (
            <div>
              {renderTree(item.children, depth + 1)}
            </div>
          )}
        </div>
      ));
    };

    const treeData = flattenTreeForRendering(fileTree);

    return (
      <div className="flex flex-col bg-gray-950 relative h-full">
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
            <div className="py-2">
              {renderTree(treeData)}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render Editor if active file exists
  const isMarkdown = activeFile.endsWith('.md')
  const content = getFileContents(fileTree, activeFile)

  return (
    <div className="flex flex-col bg-gray-950 relative h-full">
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
