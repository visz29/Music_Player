import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react"
import '../style/home.css'
import MusicPlayer from "../components/music-player.jsx"
// const MusicPlayer = lazy(() => import('../components/music-player.jsx'))
import { Loader } from 'rsuite';

import {
  Menu,
  Settings,
  RotateCcw,
  Sliders,
  ChevronRight,
  Play,
  SkipForward,
  Pause,
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
import { NavLink, Outlet } from "react-router-dom"
import { playerContext } from "../context/PlayerContext"
import Navbar from "../components/Navbar.jsx"
import { getAllSongs } from "../utils/db.js"

export default function HomePage() {

  let cosntext = useContext(playerContext)

  let [song, setSong] = useState('hf')
  let [thumbnail, setThumbnail] = useState('hf')
  let [channelTitle, setChannelTitle] = useState('hf')
  let [title, setTitle] = useState('hf')
  // Refresh all things from here
  const loadSavedSongs = async () => {
    const saved = await getAllSongs();
    // console.log(saved);
    return saved;
  };

  let folders = []
  const setFoldersFils = (folderName, songName) => {
 
    if (folders.length == 0) {
      folders.push({ name: folderName, songs: [] })
    } else if (folders.length > 0) {
      let arr = []
      folders.forEach((folder) => {
        arr.push(folder.name)
      })
      let check = arr.includes(folderName)
      if (check == true) {
        // console.log(folderName);
      } else if (check == false) {
        // console.log(folderName);
        folders.push({ name: folderName, songs: [] })
      }
    }
    folders.forEach((folder) => {
      if (folder.name == folderName) {
        // console.log(folder);
        folder.songs.push(songName)
      }
    })
  }

  


  // Refresh all things from here
  useEffect(() => {
    
    loadSavedSongs().then((songs) => {
      // console.log(songs);
      songs.forEach(song => {
        
        // let folderName = (song.name).slice(0, (song.name).indexOf("/"))
        
        setFoldersFils(song.folderName, song.blob.name)
      });
      // console.log(cosntext);
      // console.log("Folders",folders);
      cosntext.setFolders(folders)
      
    }).catch((err) => {
      console.log("somthis error on home.jsx in loadSavedSongs()");

    })

  }, [])

   const basic = {name:"visz"}

  useEffect(() => {
    // console.log(arr);
    // console.log(cosntext);
    setSong(cosntext.playingSong.songUrl)
    setThumbnail(cosntext.playingSong.thumbnail)
    setChannelTitle(cosntext.playingSong.channelTitle)
    setTitle(cosntext.playingSong.songTitle)


  }, [cosntext])

  // musicControls
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };


  return (
    <div className="home relative top-0 left-0 right-0 bg-purple-950/20 text-white h-full flex flex-col justify-between w-full 2xl:scale-100  overflow-hidden">
      {/* Status Bar */}
      {/* <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          <span>11:08</span>
          <Wifi className="w-4 h-4" />
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-xs">f</span>
          </div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs">0.15</span>
          </div>
          <span className="text-xs">KB/S</span>
          <Signal className="w-4 h-4" />
          <div className="text-xs">Vo</div>
          <div className="flex">
            <div className="w-1 h-3 bg-white mr-px"></div>
            <div className="w-1 h-3 bg-white mr-px"></div>
            <div className="w-1 h-3 bg-white mr-px"></div>
            <div className="w-1 h-3 bg-gray-600"></div>
          </div>
          <div className="border border-white rounded px-1">
            <span className="text-xs">100</span>
          </div>
        </div>
      </div> */}

      {/* Header */}
      {/* <div className="flex justify-between items-center px-4 py-4">
        <Menu className="w-6 h-6" />
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6" />
          <Settings className="w-6 h-6" />
        </div>
      </div> */}

      <Outlet />

      {/* Music Player */}
      <div className="absolute bottomBox h-full flex justify-center bottom-0 w-full bg-green-500/0 pl-1 pr-1 pt-2 pb-20 pointer-events-none">

        <MusicPlayer 
          className="bottomNav sticky bottom-0 left-0 right-0 bg-black border-t border-gray-800"
        // title={title}
        // channelTitle={channelTitle}
        // thumbnail={thumbnail}
        // song={song}
        />
        {/* <Suspense fallback={<Loader/>}>

        </Suspense> */}
        <Navbar />
      </div>

      {/* Bottom Navigation
      <div className="bottomNav sticky bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex justify-around items-center py-2">
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"/"}>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
              <span className="text-xs">Home</span>
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"tracks"}>
              <Music className="w-5 h-5 text-gray-500" />
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Library className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Folder className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"youtube"} >
              <PlayCircle className="w-5 h-5 text-gray-500" />
            </NavLink>
          </div>
        </div>
      </div> */}


      {/* Android Navigation Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-8 bg-black flex justify-center items-center">
        <div className="flex justify-between w-full px-8">
          <div className="w-4 h-4 border-2 border-gray-600 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </div>
          <div className="w-4 h-4 border-2 border-gray-600"></div>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-600 rotate-90"></div>
        </div>
      </div> */}
    </div>
  )
}
