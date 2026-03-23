export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r-2 border-green-200 bg-white/80 lg:block">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-green-700 mb-4">Project History</h2>
          <div className="rounded-xl border-2 border-dashed border-amber-200 p-6 text-center hover:border-green-500 transition-all">
            <p className="text-sm font-medium text-gray-600">No projects yet</p>
            <p className="mt-2 text-xs text-gray-500">Generate your first project to see it here</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
