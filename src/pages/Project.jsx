import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ProjectHeader from '../components/Project/ProjectHeader'
import TeamSidebar from '../components/Project/TeamSidebar'
import Editor from '../components/Project/Editor'
import AiPanel from '../components/Project/AiPanel'
import axiosInstance from '../config/axios.js'
import { initializeSocket, recieveMessage, sendMessage } from '../config/socket.js'
import UserContext from '../context/user.context.jsx'
import { getWebContainer } from '../config/webContainer.js'
import { getFileContents } from '../utils/fileSystem.js'
import Terminal from '../components/Project/Terminal.jsx'
import PreviewWindow from '../components/Project/PreviewWindow.jsx'



function Project() {
  const location = useLocation()
  // Initialize with the project passed from location state
  const [project, setProject] = useState(location.state?.project || null)
  const { user } = useContext(UserContext)
  const [messages, setMessages] = useState(location.state?.project?.messages || [])
  const [fileTree, setFileTree] = useState(location.state?.project?.fileTree || {})
  const [activeFile, setActiveFile] = useState(null)
  const [webContainerStatus, setWebContainerStatus] = useState('booting') // booting, ready, error
  const [webContainerInstance, setWebContainerInstance] = useState(null)
  const [rightTab, setRightTab] = useState('ai') // 'ai' or 'preview'
  const [previewUrl, setPreviewUrl] = useState('')

  const fetchProjectDetails = useCallback(async () => {
    if (!project?._id) return
    try {
      const res = await axiosInstance.get(`/projects/get-project/${project._id}`)
      if (res.data.project) {
        setProject(res.data.project)
        setMessages(res.data.project.messages || [])
        setFileTree(res.data.project.fileTree || {})
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

  // WebContainer Boot Logic
  useEffect(() => {
    let mounted = true;
    const initContainer = async () => {
      try {
        setWebContainerStatus('booting');
        const container = await getWebContainer();
        if (mounted) {
          setWebContainerInstance(container);
          setWebContainerStatus('ready');
          
          container.on('server-ready', (port, url) => {
            console.log(`Server ready on port ${port} at ${url}`);
            setPreviewUrl(url);
          });
        }
      } catch (err) {
        console.error("WebContainer Boot Error:", err);
        if (mounted) setWebContainerStatus('error');
      }
    };
    initContainer();
    return () => { mounted = false; };
  }, []);

  // Sync FileTree to WebContainer
  useEffect(() => {
    if (webContainerInstance && webContainerStatus === 'ready' && Object.keys(fileTree).length > 0) {
      try {
        webContainerInstance.mount(fileTree);
        console.log("File tree mounted to WebContainer");
      } catch (err) {
        console.error("Failed to mount files:", err);
      }
    }
  }, [fileTree, webContainerInstance, webContainerStatus]);

  useEffect(() => {
    // Initialize the socket connection
    const socket = initializeSocket(project._id)

    // Listen for incoming messages
    recieveMessage('project-message', data => {
      console.log('New project message:', data)
      setMessages(prev => [...prev, data]) // Append incoming message
    })

    recieveMessage('project-update-file-tree', data => {
      setFileTree(data.fileTree)
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
      <ProjectHeader 
        project={project} 
        onProjectUpdate={fetchProjectDetails} 
        webContainerStatus={webContainerStatus}
      />

      {/* Main Layout */}
      <div className="flex-1 grid md:grid-cols-4 min-h-0">
        <TeamSidebar 
          users={project?.users || []} 
          messages={messages}
          onSendMessage={(msgText) => {
            const newMsg = { id: Date.now(), text: msgText, sender: user.name || user.email?.split('@')[0] || 'Me' };
            setMessages(prev => [...prev, newMsg]);
            
            sendMessage('project-message', {
              id: newMsg.id,
              text: msgText,
              sender: newMsg.sender
            });

            if (msgText.toLowerCase().includes('@ai')) {
              let prompt = msgText.replace(/@ai/gi, '').trim();
              prompt += `\n\nProject Structure: ${JSON.stringify(Object.keys(fileTree))}`;
              
              if (activeFile) {
                 const content = getFileContents(fileTree, activeFile);
                 if (content) {
                    prompt += `\n\nActive File (${activeFile}) Contents:\n${content}`;
                 }
              }
              
              // Note: This endpoint is for Q&A. For actual file modification, use the AI Agent tab on the right.
              axiosInstance.get(`/ai/get-result?prompt=${encodeURIComponent(prompt)}`)
                .then(res => {
                  const aiMsgText = res.data.result;
                  const aiMsg = { id: Date.now(), text: aiMsgText, sender: 'AI' };
                  
                  setMessages(prev => [...prev, aiMsg]);
                  sendMessage('project-message', {
                    id: aiMsg.id,
                    text: aiMsgText,
                    sender: 'AI'
                  });
                })
                .catch(err => console.error("AI Error:", err));
            }
          }}
        />
        <div className="md:col-span-2 flex flex-col h-full border-r border-white/5 min-h-0">
          <div className="flex-[2] overflow-hidden min-h-0">
            <Editor 
              projectName={project?.name} 
              fileTree={fileTree} 
              setFileTree={(newTree) => {
                setFileTree(newTree);
                sendMessage('project-update-file-tree', { fileTree: newTree });
              }}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
          </div>
          <div className="flex-[1] overflow-hidden border-t border-white/5 min-h-[200px] flex flex-col">
            <Terminal webContainerInstance={webContainerInstance} />
          </div>
        </div>

        {/* Right Sidebar - Tabs */}
        <div className="md:col-span-1 flex flex-col h-full bg-gray-900/30 min-h-0">
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => setRightTab('ai')}
              className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${rightTab === 'ai' ? 'bg-white/5 text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              AI Agent
            </button>
            <button 
              onClick={() => setRightTab('preview')}
              className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${rightTab === 'preview' ? 'bg-white/5 text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Preview
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {rightTab === 'ai' ? (
              <AiPanel projectId={project?._id} fileTree={fileTree} setFileTree={(newTree) => {
                  setFileTree(newTree);
                  sendMessage('project-update-file-tree', { fileTree: newTree });
              }} />
            ) : (
              <PreviewWindow url={previewUrl} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project