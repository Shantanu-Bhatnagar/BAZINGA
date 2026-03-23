"use client";

import { useState } from "react";

export default function ProjectForm({
  onGenerate,
  loading,
}: {
  onGenerate: (data: any) => void;
  loading: boolean;
}) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("Python");
  const [framework, setFramework] = useState("FastAPI");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onGenerate({
      project_name: projectName,
      description,
      language,
      framework,
      provider: "gemini",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-green-900 mb-2">Project Name</label>
        <input
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-amber-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          placeholder="My Awesome Project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-green-900 mb-2">Project Description</label>
        <textarea
          className="w-full px-4 py-3 rounded-lg bg-white border-2 border-amber-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
          placeholder="Describe what your project does..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-green-900 mb-2">Language</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-amber-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all appearance-none cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Python</option>
            <option>JavaScript</option>
            <option>TypeScript</option>
            <option>Java</option>
            <option>C++</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-green-900 mb-2">Framework</label>
          <select
            className="w-full px-4 py-3 rounded-lg bg-white border-2 border-amber-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all appearance-none cursor-pointer"
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
          >
            <option>FastAPI</option>
            <option>Next.js</option>
            <option>React</option>
            <option>Django</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Generating..." : "Generate Project"}
      </button>
    </form>
  );
}
