'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import GeneratedProjectPanel from '@/components/GeneratedProjectPanel'
import GitHubConnect from '@/components/GitHubConnect'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  // ===============================
  // 🔐 CHECK LOGIN + FETCH USER
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem('github_token')

    if (token) {
      setIsLoggedIn(true)

      // ✅ Fetch GitHub user
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.login) {
            setUsername(data.login)
          }
        })
        .catch(() => {
          console.log("Failed to fetch user")
        })
    }
  }, [])

  // ===============================
  // 🔥 GENERATE
  // ===============================
  const generateProject = async () => {
    setLoading(true)

    try {
      const res = await fetch('http://127.0.0.1:8000/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_name: 'MyProject',
          description: prompt,
          language: 'Python',
          framework: 'FastAPI',
          provider: 'gemini',
        }),
      })

      const data = await res.json()

      if (data.status === 'success') {
        setProject(data)
      } else {
        alert("Generation failed")
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }

  // ===============================
  // 🔐 LOGIN
  // ===============================
  const connectGitHub = () => {
    window.location.href = 'http://127.0.0.1:8000/auth/github/login'
  }

  // ===============================
  // 🔓 LOGOUT
  // ===============================
  const logoutGitHub = () => {
    localStorage.removeItem('github_token')
    setIsLoggedIn(false)
    setUsername(null)
    alert("Logged out")
  }

  // ===============================
  // 🚀 PUSH
  // ===============================
  const handlePush = async () => {
    const token = localStorage.getItem('github_token')

    if (!token) {
      connectGitHub()
      return
    }

    if (!project || !project.files) {
      alert("No project")
      return
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/github/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repo_name: "bazinga-" + Date.now(),
          files: project.files,
          access_token: token
        }),
      })

      const data = await res.json()

      if (data.status === "success") {
        alert(`🚀 Repo created: ${data.owner}/${data.repo}`)
      } else {
        alert("Push failed")
      }

    } catch (err) {
      console.error(err)
      alert("Push error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <div className="w-72 border-r-2 border-green-200 bg-white/80 p-8">

          <h2 className="text-xl font-bold text-green-900 mb-6">
            Project Status
          </h2>

          {/* ✅ LOGIN / USER */}
          {isLoggedIn ? (
            <div className="space-y-4">

              <div className="px-5 py-4 rounded-xl bg-green-50 border-2 border-green-300">
                <p className="text-sm text-green-700 font-medium">
                  Connected as:
                </p>
                <p className="font-bold text-green-900">
                  {username || "Loading..."}
                </p>
              </div>

              <button
                onClick={logoutGitHub}
                className="w-full px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>

          ) : (
            <GitHubConnect />
          )}
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col">

          {/* Output */}
          <div className="flex-1 overflow-y-auto p-6">
            {project && (
              <GeneratedProjectPanel project={project} />
            )}
          </div>

          {/* Input */}
          <div className="border-t p-6 flex gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your project..."
              className="flex-1 px-4 py-3 border rounded-lg"
            />

            <button
              onClick={generateProject}
              className="px-6 py-3 bg-green-600 text-white rounded-lg"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}