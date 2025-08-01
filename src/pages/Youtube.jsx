import { Home,Search, Bell, Users, Music2Icon, FileMusicIcon,Settings, DownloadCloudIcon, History, Play, Heart, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "../components/Button.jsx"
import { useContext, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import { playerContext } from "../context/PlayerContext.jsx"


export default function Component() {
  let [inputField, setInputField]= useState(0)
  let [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate([]);
  let [resultArray, setResultArray] = useState([])
  let cosntext = useContext(playerContext)
  // console.log(cosntext);
  
  

  const getData = (e) => {
    console.log(e.target.value);
    if(e.key == "Enter" && searchInput !== ""){
      // console.log("keypress",searchInput);
      // let inppuValue = (e.target.value).replace(" ","+")
      // console.log(inppuValue);
      fetchData(e.target.value)
      // e.target.value = "Ok"
      navigate('/youtube/result')
    }
  }

  async function fetchData(value){
    try{
      let res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDzIhMA-bsY7ZzjLa7yEb53lJtu25mc-Z8&part=snippet&q=${value}&maxResults=15`)
      console.log(res);
      setResultArray(res.data.items)
      cosntext.setResultArray(res.data.items)
    }catch(err){
      console.log("my error", err);
      
    }
  }

  const y_search = (e) => {
    console.log(inputField);
    if(inputField === 0){
      setInputField(1)
      // document.querySelector(".searchBox").classList.remove("w-30");
      // document.querySelector(".searchBox").classList.add("w-105"); ;

      document.querySelector(".inputSearch").classList.remove("w-0/10");
      document.querySelector(".inputSearch").classList.add("w-52/10"); 

      document.querySelector(".inputSearch").classList.remove("opacity-0");
      document.querySelector(".inputSearch").classList.add("opacity-100"); 
    }else{
      setInputField(0)
      // document.querySelector(".searchBox").classList.remove("w-105");
      // document.querySelector(".searchBox").classList.add("w-30"); ;

      document.querySelector(".inputSearch").classList.remove("w-52/10");
      document.querySelector(".inputSearch").classList.add("w-0/10");

      document.querySelector(".inputSearch").classList.remove("opacity-100");
      document.querySelector(".inputSearch").classList.add("opacity-0");
    }
    
  }


  return (
    <div className=" bg-[#0f0f0f] text-white">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between border-b border-gray-800 relative overflow-hidden">

        <div className="flex w-9/11 items-center h-full space-x-6 p-4">
          <Home className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Users className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Music2Icon className="w-6 h-6 text-white" />
          <FileMusicIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <DownloadCloudIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Settings className="w-6 h-6" />
        </div>
        <div className="searchBox  transition-all duration-500 flex justify-end  h-12 right-0 w-20 relative" >
          <input onKeyPress={getData} onChange={(e)=>{setSearchInput(e.target.value)}} type="text" className="inputSearch opacity-0 transition-all duration-500 w-0/10 h-full z-0 right-0 top-0 bg-[#0f0f0f] border-2  border-gray-500 absolute pl-5 rounded-3xl outline-0" />
          <button
          onClick={y_search}
          className="h-10/10 w-12 flex justify-center items-center bg-[#0f0f0f]/0 z-0 ">
          <Search className="w-6 h-6" />
          </button>
        </div>
      </nav>
      

      {/* Main Content */}
      <Outlet arr={resultArray} />
    </div>
  )
}
