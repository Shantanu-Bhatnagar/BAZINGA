"use client";

import { useState } from "react";

type FileType = {
  path: string;
  content: string;
};

export default function GeneratedProjectPanel({ project }: any) {
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!project) return null;

  if (project.status === "error") {
    return (
      <div className="p-8">
        <div className="max-w-4xl rounded-xl border-2 border-red-400 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">Generation Error</h2>
          <p className="text-red-600">{project.message}</p>
        </div>
      </div>
    );
  }

  if (!project.files) {
    return <div className="p-8 text-gray-600">No files generated</div>;
  }

  const pushToGitHub = async () => {
    const token = localStorage.getItem("github_token");

    if (!token) {
      localStorage.setItem("pending_project", JSON.stringify(project));
      window.location.href = "http://localhost:3000/auth/github/callback";
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/github/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repo_name: "bazinga-" + Date.now(),
          files: project.files,
          access_token: token
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("🚀 Project pushed to GitHub!");
      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Push failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string, index: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green-900 mb-2">Generated Files</h2>
          <p className="text-gray-600">Review the generated code and push to GitHub</p>
        </div>

        <div className="space-y-3 mb-6">
          {project.files.map((file: FileType, index: number) => (
            <div key={index} className="group rounded-xl border-2 border-amber-200 bg-amber-50 hover:border-green-500 hover:shadow-md transition-all overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-amber-200 bg-white">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="font-mono text-sm text-green-700 font-semibold truncate">{file.path}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(file.content, index)}
                  className="ml-3 px-3 py-2 rounded-lg hover:bg-green-100 transition-all flex-shrink-0 text-sm font-medium"
                  title="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <span className="text-green-600">Copied!</span>
                  ) : (
                    <span className="text-green-600">Copy</span>
                  )}
                </button>
              </div>
              <div className="p-4 overflow-x-auto max-h-48 bg-white">
                <pre className="font-mono text-xs text-gray-700 whitespace-pre-wrap break-words">
                  {file.content}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={pushToGitHub}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
        >
          {loading ? "Pushing to GitHub..." : "Push to GitHub"}
        </button>
      </div>
    </div>
  );
}
