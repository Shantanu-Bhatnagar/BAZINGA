export default function ProfilePanel() {
  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-amber-200 bg-amber-50 p-4 hover:border-green-500 transition-all">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">G</div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-green-900">Guest User</p>
        <p className="text-xs text-green-600">No authentication required</p>
      </div>
    </div>
  )
}
