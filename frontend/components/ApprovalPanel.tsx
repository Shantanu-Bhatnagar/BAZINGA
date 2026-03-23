"use client";

import { useState } from "react";

export default function ApprovalPanel({ project }: any) {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const handlePush = async () => {
    try {
      const token = localStorage.getItem("github_token");

      if (!token) {
        const res = await fetch("http://localhost:3000/auth/github/callback");
        const data = await res.json();
        localStorage.setItem("pending_project", JSON.stringify(project));
        window.location.href = data.url;
        return;
      }

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
        alert("Project pushed to GitHub!");
      } else {
        alert("Error: " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-6 rounded-xl border-2 border-amber-200 bg-amber-50 space-y-4">
      <div>
        <h3 className="font-bold text-green-900 mb-1">Review Before Deployment</h3>
        <p className="text-sm text-gray-600">Make sure you've reviewed all generated files before pushing to GitHub</p>
      </div>

      <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-green-300 bg-white hover:bg-green-50 cursor-pointer transition-all">
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
          className="w-5 h-5 rounded border-green-500 bg-white cursor-pointer accent-green-600"
        />
        <span className="text-sm font-medium text-green-900">I have reviewed the generated content and approve execution</span>
      </label>

      <button
        onClick={handlePush}
        disabled={loading || !project?.files || !approved}
        className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Pushing..." : "Push to GitHub"}
      </button>
    </div>
  );
}
