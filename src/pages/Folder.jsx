import React, { useContext, useEffect, useState } from 'react'
import { Home, Bookmark, SlidersHorizontal, MoreVertical } from "lucide-react";
import { playerContext } from "../context/PlayerContext.jsx"
import SongsOnFolder from '../components/SongsOnFolder.jsx';
import { getAllSongs } from '../utils/db.js';


function Folder_() {

  const context = useContext(playerContext)
  let [folders,setFolders] = useState([])
  let [Songs,setSongs] = useState([])
  let [openSongs,setOpenSongs] = useState(false)
  let [path,setPath] = useState("Home")

  const loadSavedSongs = async () => {
        const saved = await getAllSongs();
        // console.log(saved.blobUrl);
        
        // setSongs(saved.map(song => ({
        //   ...song,
        //   blobUrl: URL.createObjectURL(song.blob),
        // })));
        return saved.map(song => ({
          ...song,
          blobUrl: URL.createObjectURL(song.blob),
        }))
      };

  useEffect(()=>{
    console.log(context);
    // console.log(folders);
    
    setFolders(context.folders)
  },[context])

  const folderClick = (e)=>{
    setPath(`0/${e.target.id}`)
    
    loadSavedSongs()
    .then((songs)=>{
      // console.log(songs);
      let folderSongs = songs.filter((song)=>{
        let songName = song.name
        console.log(e.target.id);
        console.log(song.folderName);
        // console.log(e.target.id);
        // console.log((song.name).slice(0, (song.name).indexOf("/")));
        if(song.folderName == e.target.id){
          return song
          
          // console.log(e.target.id);
        }
      })
      console.log(folderSongs);
      setSongs(folderSongs)
      setOpenSongs(true)
    }).catch()
  }

  const backToHome = ()=>{
    setPath("Home")
    setSongs([])
      setOpenSongs(false)
  }



  return  (
    <div className="h-screen overflow-scroll pb-38 bg-gray-100 p-4 space-y-4">
      {/* Top Bar */}
      <div className="flex  items-center justify-between h-10 pl-3 border-1 border-white/90 pr-3 sticky top-0" 
      style={{background: 'rgba(255, 255, 255, 0.07)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(9.2px)',
      // border: '1px solid rgba(255, 255, 255, 0.3)'
    }}
      >
        <div className="flex items-center space-x-2">
          <Home className="w-5 h-5 text-gray-600" />
          <span onClick={backToHome} className="text-lg font-medium text-gray-700">{path}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Bookmark className="w-5 h-5 text-gray-600" />
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Folder Card */}
      {openSongs == false ?
      folders.map((folder,i)=>(
        <div key={i} onClick={folderClick} id={folder.name} className="bg-white rounded-xl p-4 flex items-center justify-between shadow">
        {/* Left Icon and Image */}
        <div className="flex items-center space-x-3 pointer-events-none">
          <div className="relative">
            {/* Folder Icon */}
            <div className="w-12 h-12 border-2 border-gray-400 rounded-md flex items-center justify-center">
              {/* Album art inside folder */}
              <img
                src="/album-cover.jpg"
                alt="Cover"
                className="absolute w-7 h-7 object-cover rounded-md top-1.5 left-1.5"
              />
            </div>
          </div>

          {/* Folder Info */}
          <div className="flex flex-col">
            <span className="text-gray-700 font-semibold text-sm">{folder.name}</span>
            <span className="text-gray-500 text-sm">{folder.songs.length + 1} Tracks </span>
          </div>
        </div>

        {/* More Menu */}
        <MoreVertical className="text-gray-500 pointer-events-none" />
      </div>
      )) :
      <SongsOnFolder songs={Songs}/>
      }
      
    </div>
    )
}

export default Folder_