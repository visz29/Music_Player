import { createContext, useState } from 'react'
import apt from '../assets/apt.mp3'


export const playerContext = createContext()

function PlayerContext({ children }) {
  let [user, setUser] = useState("vishal")
  let [resultArray, setResultArray] = useState([])
  let [playingSong, setPlayingSong] = useState({
    channelTitle: "ROSÉ",
    songTitle: "ROSÉ &amp; Bruno Mars - APT. (Official Music Video)",
    songUrl: apt,
    thumbnail: "https://i.ytimg.com/vi/ekr2nIex040/hqdefault.jpg",
    loading: false,
    status: false,
  })
  let [folders, setFolders] = useState([])

  let [userData, setUserData] = useState({
    bio: "",
    createdAt: "",
    email: "",
    password: "",
    profilePic: "",
    updatedAt: "",
    username: "",
    _id: "",
  })


  return (
    <div className="w-full h-full ">
      <playerContext.Provider value={{ user, setUser, resultArray, setResultArray, playingSong, setPlayingSong, folders, setFolders, userData, setUserData }}>
        {children}
      </playerContext.Provider>
    </div>
  )
}

export default PlayerContext