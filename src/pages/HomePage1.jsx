import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent } from "../components/Card.jsx"
import { Button } from "../components/Button.jsx"
import '../style/homePage.css'
import {
  Menu,
  Settings,
  RotateCcw,
  Sliders,
  ChevronRight,
  Play,
  SkipForward,
  Home,
  Music,
  User,
  Library,
  Folder,
  PlayCircle,
  Wifi,
  Signal,
  Search
} from "lucide-react"
import BasicHeader from '../components/BasicHeader.jsx'
import PlayerContext from '../context/PlayerContext.jsx'


function HomePage1() {
  return (
    <div className='homePage relative'>

      <BasicHeader />


        {/* App Title */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Namaste</h1>
          <Sliders className="w-6 h-6" />
        </div>
      </div>

      {/* Mixes Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-semibold">Mixes</h2>
        </div>

        {/* Mix Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-t-lg"></div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-cyan-600 rounded-t-lg"></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Recents / Favourites Tabs */}
      <div className="px-4 mb-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-gray-300">Top Recents</h3>
          <h3 className="text-lg font-medium text-gray-300">Favourites</h3>
        </div>
      </div>

      {/* Recent Listens */}
      <div className="px-4 mb-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold">Recent Listens</h2>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      {/* Currently Playing */}
      {/* <div className="currentPlaying absolute h-20 w-full bottom-0 left-0 right-0 px-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">FAIRYTALE</span>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Alexander Rybak - Fairyta...</p>
                <p className="text-gray-400 text-xs">Aqua Lyrics</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}

export default HomePage1