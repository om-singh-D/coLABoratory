# coLABoratory 🚀

*The Future of Collaborative, AI-Native Software Development.*

coLABoratory is not just another text editor. It is a fully-featured, web-based Integrated Development Environment (IDE) built from the ground up to redefine how teams write code together. By seamlessly merging real-time synchronization, a native file explorer, and autonomous AI agents directly into the workspace, coLABoratory eliminates friction and accelerates development workflows.

If you are a recruiter or an engineer reviewing this project, this repository showcases advanced system design, complex state management, real-time websockets, and cutting-edge Generative AI integrations.

---

## 🌟 The Product Experience

Imagine the robust file management and syntax highlighting of VSCode, combined with the real-time multiplayer cursor magic of Figma, augmented by an AI that doesn't just answer questions—it writes code and structures your files for you. 

### 1. The Virtual File System (VFS)
Gone are the days of single-file web editors. coLABoratory implements a complete virtual file tree. 
- **Dynamic File Explorer**: Users can create, navigate, and manage nested files just like a native desktop IDE. 
- **VSCode Fidelity**: Powered by CodeMirror and dynamically loaded language parsers, the editor automatically detects file extensions (`.jsx`, `.py`, `.cpp`, `.css`) and applies vibrant, accurate syntax highlighting using the official VSCode Dark Theme.
- **Integrated Markdown**: Write documentation and seamlessly toggle to a beautifully rendered Markdown preview pane without leaving the editor.

### 2. Context-Aware AI Assistant (Left Panel)
Developers hate switching context. In coLABoratory, the AI lives directly in the team chat.
- **Intelligent Context Injection**: Tag `@ai` in any message, and the system instantly pulls the contents of your currently active file in the editor, passing it as hidden context to the LLM. 
- **Result**: You can ask *"@ai why is this function failing?"* and the AI will know exactly what you are looking at, providing hyper-relevant, codebase-specific answers to the entire team.

### 3. Autonomous AI Agent (Right Panel)
This is where coLABoratory shines. The Right Panel is a dedicated Generative AI Agent with write-access to your workspace.
- **Architectural Generation**: Ask the Agent to *"build a responsive Tailwind navigation bar in src/Nav.jsx"* and it doesn't just give you code—it **executes** it. 
- **Structured Data Pipelines**: The frontend sends the entire file tree topology to the backend, forces the LLM to output rigid JSON structures, parses the result, and injects the new files and code directly into your active workspace.

### 4. Multiplayer Real-Time Sync
Every keystroke, every new file, every AI-generated component is instantly broadcast to all connected team members.
- **Zero-Latency Feel**: Using Socket.io, the application maintains a persistent bidirectional connection, ensuring that if one developer (or the AI Agent) creates a file, it appears on everyone else's screen simultaneously.

---

## 🛠️ Technical Architecture

This frontend is a masterclass in modern React architecture and performance optimization.

### Core Stack
- **Framework**: React.js (Vite) - Chosen for lightning-fast HMR and optimized build sizes.
- **Editor Engine**: CodeMirror (`@uiw/react-codemirror`) - For high-performance text editing and syntax tree parsing.
- **Styling**: Tailwind CSS - Utilized for rapid UI development, implementing a modern, glassmorphic dark-mode aesthetic.
- **Real-Time Layer**: Socket.io-client - For robust websocket connections and room-based event broadcasting.
- **Markdown Rendering**: `markdown-to-jsx` - For safe and performant markdown parsing.
- **Routing**: React Router DOM - For seamless client-side navigation.

### Engineering Highlights to Look For:
1. **Dynamic Imports for Performance**: Instead of bundling every possible syntax parser (which would bloat the app), the editor uses `@uiw/codemirror-extensions-langs` to dynamically load the exact language parser needed based on the active file's extension.
2. **Complex State Synchronization**: Managing a deep JSON file tree in React is notoriously difficult. coLABoratory elegantly handles deep object updates and synchronizes them with the backend and websocket layer without triggering unnecessary re-renders.
3. **Graceful Error Handling**: The AI Agent panel expects strict JSON from the LLM. The frontend and backend work in tandem to sanitize, parse, and gracefully recover if the LLM hallucinates formatting.

---

## 🚀 Getting Started

Want to see it in action?

1. Clone this repository and navigate to the root directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env` file and point it to the coLABoratory backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser, create an account, invite a friend (or just open a second tab), and start building!

---

**Developed by [@om-singh-D](https://github.com/om-singh-D)**
