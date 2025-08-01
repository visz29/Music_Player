import { SortDropdown } from "./sort-dropdown.jsx"

export default function Music_sort_demo() {
  return (
    <div className="min-h-6/10 fixed right-2 top-30 bg-rose-50">
      {/* Background content to show the dropdown overlay effect */}
      <div className="first p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
            <div>
              <div className="font-medium">Song Title 1</div>
              <div className="text-gray-500 text-sm">Artist Name</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded"></div>
            <div>
              <div className="font-medium">Song Title 2</div>
              <div className="text-gray-500 text-sm">Artist Name</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Dropdown Component */}
      <SortDropdown />
    </div>    
  )
}
