import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ webContainerInstance }) => {
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef(null);
  const activeProcessRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleStop = () => {
    if (activeProcessRef.current) {
      activeProcessRef.current.kill();
      activeProcessRef.current = null;
      setIsRunning(false);
      setOutput(prev => prev + `\nProcess terminated by user.\n`);
    }
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || !webContainerInstance || isRunning) return;

    const cmdString = input.trim();
    setInput('');
    setOutput(prev => prev + `\n$ ${cmdString}\n`);
    
    try {
      setIsRunning(true);
      // Pass the entire command string to the WebContainer's built-in shell (jsh)
      // This allows it to parse things like '&&', '|', and other bash operators natively.
      const process = await webContainerInstance.spawn('jsh', ['-c', cmdString]);
      activeProcessRef.current = process;

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            // Strip ANSI escape codes so the output is readable in a standard div
            const cleanData = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
            setOutput(prev => prev + cleanData);
          }
        })
      );

      // Wait for process to exit
      const exitCode = await process.exit;
      activeProcessRef.current = null;
      setOutput(prev => prev + `\nProcess exited with code ${exitCode}\n`);
    } catch (err) {
      setOutput(prev => prev + `\nError: ${err.message}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-white/10 font-mono text-sm relative">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#252526] border-b border-white/5">
        <span className="text-gray-400 text-xs tracking-wider uppercase">Terminal</span>
        <div className="flex items-center gap-2">
          {isRunning && (
            <button 
              onClick={handleStop}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Stop Process"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          )}
          <button 
            onClick={() => setOutput('')}
            className="text-gray-500 hover:text-gray-300 transition-colors"
            title="Clear Terminal"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 text-gray-300 whitespace-pre-wrap font-mono text-[13px] leading-relaxed"
      >
        {output || 'Welcome to the WebContainer Terminal.\nType a command (e.g. npm install) to get started.'}
      </div>

      <form onSubmit={handleCommand} className="flex items-center px-3 py-2 bg-[#2d2d2d] border-t border-white/5">
        <span className="text-green-400 mr-2">➜</span>
        <span className="text-cyan-400 mr-2">~/project</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!webContainerInstance || isRunning}
          placeholder={!webContainerInstance ? "Waiting for container..." : isRunning ? "Command running..." : "Enter command..."}
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
        />
      </form>
    </div>
  );
};

export default Terminal;
