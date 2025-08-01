import { useContext, useState } from 'react'
import './App.css'
import { playerContext } from './context/PlayerContext.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
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
import HomePage from './pages/Home.jsx'
import HomePage1 from './pages/HomePage1.jsx'
import Tracks from './pages/Tracks.jsx'
import Youtube from './pages/Youtube.jsx'
import SearchResult from './components/SearchResult.jsx'
import SearchHistory from './components/SearchHistory.jsx'
import LocalLibrary from './pages/LocalLibrary.jsx'
import Folder_ from './pages/Folder.jsx'
import Setting from './pages/Setting.jsx'
import LogIn from './pages/LogIn.jsx'
import SignUp from './pages/SignUp.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/ProfilePage.jsx'

function App() {
  const [count, setCount] = useState(0)
  // let contextData = useContext(playerContext)
  // console.log(contextData);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path=""  >

        <Route path="/" element={<HomePage />} >
          <Route path="" element={<HomePage1 />} />
          <Route path='tracks' element={<Tracks />} />
          <Route path='/library' element={<LocalLibrary />} />
          <Route path='/folder' element={<Folder_ />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/youtube' element={<Youtube />}>
            <Route path='' element={<SearchHistory />} />
            <Route path='result' element={<SearchResult />} />
          </Route>
        </Route>

      </Route>
    )
  )


  return (
    <div className='w-full h-full '>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Bounce"
         />
      {/* <h1 className='text-pink-400 bg-yellow'>hi there </h1> */}
      <RouterProvider router={router} />
      {/* Bottom Navigation */}

    </div >
  )
}

export default App
