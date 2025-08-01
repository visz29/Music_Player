
import { Home,Search, Bell, Users, Music2Icon, FileMusicIcon, DownloadCloudIcon, History, Play, Heart, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "../components/Button.jsx"


function SearchHistory() {
  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      {/* <BasicHeader /> */}


        {/* History Section */}
        <div className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-3">
            <History className="w-6 h-6 text-gray-400" />
            <div>
              <h2 className="text-lg font-medium text-white">History</h2>
              <p className="text-sm text-gray-400">0 Video</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </div>

        {/* Most Played Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6 text-gray-400" />
              <div>
                <h2 className="text-lg font-medium text-white">Most Played</h2>
                <p className="text-sm text-gray-400">0 Video</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </div>

          {/* Time Filter Buttons */}
          <div className="flex items-center w-full space-x-1 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Custom
              <ChevronDown className="w-4 h-4 ml-0" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
              Day
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
              3 Days
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
              Week
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
              Month
            </Button>
          </div>
        </div>

        {/* Favourites Section */}
        <div className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-gray-400" />
            <div>
              <h2 className="text-lg font-medium text-white">Favourites</h2>
              <p className="text-sm text-gray-400">0 Video</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </div>
      </div>
  )
}

export default SearchHistory