"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    document.documentElement.classList.add("light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    if (newTheme === "light") {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-green-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white font-bold text-lg">B</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BAZINGA</h1>
            <p className="text-xs text-green-600">AI Code Generator</p>
          </div>
        </div>

        {/* UNCOMMENT TO ENABLE THEME TOGGLE */}
        {/* <div className="ml-auto">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all font-medium text-sm"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div> */}
      </div>
    </header>
  )
}
