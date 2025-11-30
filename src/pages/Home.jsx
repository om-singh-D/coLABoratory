import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser.js'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Real-time Collaboration',
      description: 'Work together seamlessly with live cursors, instant updates, and synchronized editing powered by WebSockets.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Assistance',
      description: 'Get intelligent suggestions, code completions, and smart insights with Google Gemini integration.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Redis-powered caching ensures blazing fast performance, even with multiple concurrent users.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure by Design',
      description: 'Enterprise-grade security with encrypted connections and role-based access control.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Flexible Workspaces',
      description: 'Create custom workspaces for different projects with drag-and-drop organization.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Code Together',
      description: 'Built-in code editor with syntax highlighting, live preview, and version history.'
    }
  ]

  const techStack = [
    { name: 'MongoDB', color: 'from-green-400 to-green-600' },
    { name: 'Express', color: 'from-gray-400 to-gray-600' },
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', color: 'from-green-500 to-emerald-600' },
    { name: 'Redis', color: 'from-red-400 to-red-600' },
    { name: 'Socket.io', color: 'from-gray-300 to-gray-500' },
    { name: 'Gemini AI', color: 'from-blue-400 to-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-xl font-bold">C</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">coLABoratory</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#tech" className="text-gray-400 hover:text-white transition-colors text-sm">Tech Stack</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated() ? (
                <>
                  <span className="text-gray-400 text-sm">
                    Hey, <span className="text-white font-medium">{user?.name || user?.email?.split('@')[0]}</span>
                  </span>
                  <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm px-4 py-2">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-white/10 text-white hover:bg-white/20 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm px-4 py-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="bg-white text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/5 pt-4">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#tech" className="text-gray-400 hover:text-white transition-colors">Tech Stack</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
                {isAuthenticated() ? (
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="text-gray-400 text-sm">
                      Hey, <span className="text-white font-medium">{user?.name || user?.email?.split('@')[0]}</span>
                    </span>
                    <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors px-4 py-2">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="bg-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 mt-2">
                    <Link to="/login" className="text-gray-400 hover:text-white transition-colors px-4 py-2">
                      Sign In
                    </Link>
                    <Link to="/register" className="bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-medium">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Now with Gemini AI Integration
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Build together,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                ship faster.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mt-6 leading-relaxed max-w-2xl">
              A collaborative workspace where teams come together to create, code, and innovate. 
              Real-time editing, AI assistance, and seamless communication—all in one place.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              {isAuthenticated() ? (
                <Link 
                  to="/dashboard" 
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                >
                  Go to Dashboard
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                >
                  Start Collaborating
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              <a 
                href="#features" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="backdrop-blur-sm bg-white/[0.02] rounded-2xl border border-white/10 p-2 shadow-2xl">
              <div className="bg-gray-900/80 rounded-xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-white/5 rounded-md text-xs text-gray-500">
                      workspace / project-alpha
                    </div>
                  </div>
                </div>
                
                {/* Window Content */}
                <div className="grid md:grid-cols-4 min-h-[400px]">
                  {/* Sidebar */}
                  <div className="border-r border-white/5 p-4 hidden md:block">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Team Members</div>
                    <div className="space-y-3">
                      {['Alex', 'Jordan', 'Sam', 'Taylor'].map((name, i) => (
                        <div key={name} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            ['bg-purple-500/20 text-purple-400', 'bg-cyan-500/20 text-cyan-400', 'bg-pink-500/20 text-pink-400', 'bg-green-500/20 text-green-400'][i]
                          }`}>
                            {name[0]}
                          </div>
                          <div>
                            <div className="text-sm text-gray-300">{name}</div>
                            <div className="text-xs text-gray-600">
                              {['Editing...', 'Online', 'Away', 'Online'][i]}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-2 p-6 border-r border-white/5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-gray-300 font-medium">Project Overview.md</span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-500 font-mono">
                        <div><span className="text-purple-400">#</span> <span className="text-gray-300">Project Alpha</span></div>
                        <div className="h-2"></div>
                        <div><span className="text-gray-600">Building the future of collaboration</span></div>
                        <div className="h-2"></div>
                        <div><span className="text-purple-400">##</span> <span className="text-gray-400">Features</span></div>
                        <div><span className="text-cyan-400">-</span> Real-time editing</div>
                        <div><span className="text-cyan-400">-</span> AI assistance</div>
                        <div><span className="text-cyan-400">-</span> Team chat<span className="inline-block w-2 h-4 bg-purple-400 animate-pulse ml-1"></span></div>
                      </div>
                    </div>
                  </div>

                  {/* AI Panel */}
                  <div className="p-4 hidden md:block">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">AI Assistant</div>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-gray-500 mb-2">Suggestion</div>
                        <p className="text-sm text-gray-400">Consider adding error handling to the API endpoint.</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-xs text-purple-400 mb-2">Gemini</div>
                        <p className="text-sm text-gray-300">I can help optimize this function. Would you like me to suggest improvements?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to collaborate</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for modern teams who want to work smarter, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-200">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with modern tech</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powered by the MERN stack and enhanced with cutting-edge technologies for the best experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-full bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
              >
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${tech.color} font-medium`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Architecture Preview */}
          <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 mb-2">Frontend</h3>
                <p className="text-sm text-gray-500">React with Tailwind CSS for a beautiful, responsive interface</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 mb-2">Backend</h3>
                <p className="text-sm text-gray-500">Node.js & Express with Redis caching for blazing speed</p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 mb-2">Real-time</h3>
                <p className="text-sm text-gray-500">Socket.io for instant updates and live collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform how your team works?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using coLABoratory to build amazing things together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Get Started for Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-6">No credit card required • Free forever for small teams</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-sm font-bold">C</span>
              </div>
              <span className="font-semibold">coLABoratory</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-sm text-gray-600">
              © 2025 coLABoratory. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
