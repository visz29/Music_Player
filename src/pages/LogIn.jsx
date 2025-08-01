"use client"

import { useContext, useEffect, useState } from "react"
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Gift, Cloud } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { getUser, login } from "../utils/userAccount.js"
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { playerContext } from "../context/PlayerContext.jsx"
import { saveUserData } from "../utils/saveLocalData.js"
import Circle_Loader from "../components/Circle_Loader.jsx"


// Custom Input Component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("visz@gmail.com")
  const [password, setPassword] = useState("12345678")
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let context = useContext(playerContext)


  const log_in = async () => {
    console.log((document.cookie).split("=")[1]);

    await login({ email, password, cookie: (document.cookie).split("=")[1] })
      .then((res) => {
        setIsLoading(true)
        console.log(res);
        if (res.status == true) {
          get_user({ email, password, cookie: (document.cookie).split("=")[1] })
          setTimeout(() => {
            setIsLoading(false)
          }, 2000);
          setTimeout(() => {
            navigate('/profile');
          }, 2000)
        }


      })
      .catch((err) => {
        console.log("LogIn ERROR => ", err);
        return false

      })

    // let res = await getUser({ email, password, cookie: (document.cookie).split("=")[1] })
    //   .then((res) => {
    //     console.log(res);
    //     let user = res.response.user
    //     console.log("user => ", user);


    //     if (res.status == true) {
    //       console.log(context.userData);
    //       context.setUserData({
    //         bio: user.bio,
    //         createdAt: user.createdAt ,
    //         email: user.email,
    //         password: user.password,
    //         profilePic: user.profilePic,
    //         updatedAt: user.updatedAt,
    //         username: user.username,
    //         _id: user._id,
    //       })
    //     }
    //   })

  }

  

  const get_user = async ({ email, password, cookie }) => {

    console.log("email", email);
    console.log("password", password);
    console.log("cookie", cookie);
    let res = await getUser({ email, password, cookie })
      .then((res) => {
        console.log(res);
        let user = res.response.user
        console.log("user => ", user);


        if (res.status == true) {

          const userData = {
            login: true,
            email: user.email,
            password: user.password, 
            username: user.username,
          };

          saveUserData(userData);
          
          context.setUserData({
            bio: user.bio,
            createdAt: user.createdAt,
            email: user.email,
            password: user.password,
            profilePic: user.profilePic,
            updatedAt: user.updatedAt,
            username: user.username,
            _id: user._id,
          })
        }
      })
  }

  useEffect(()=>{
    // Check if user is already logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    console.log("userData", userData);
    if (!userData ) { return}
    
    if ( userData.login === true) {
      navigate('/profile');
    }
  },[])

  return (
    <div className="min-h-screen bg-black text-white z-1">


      {/* Header */}
      <div className="flex justify-between items-center px-4 py-6">
        <NavLink to={"/tracks"}>

          <ArrowLeft className="w-6 h-6" />
        </NavLink>
        <div className="w-8 h-8 border-2 border-white/30 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-8 ">
        <div className="bg-gray-800/50 rounded-3xl p-6 backdrop-blur-sm">
          {/* Unknown Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-700/80 px-6 py-3 rounded-2xl">
              <span className="text-gray-300 font-medium">Sign In</span>
            </div>
          </div>

          {/* Sign In Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 bg-gray-700/50 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-lg font-medium">Welcome Back</span>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 pr-12 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button onClick={log_in} className="flex-1 bg-gray-700/50 hover:bg-green-500/70 text-white rounded-2xl h-14 text-base font-medium inline-flex items-center justify-center   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transition-all duration-700">
                <Cloud className="w-5 h-5 mr-2" />
                Sign In
              </button>
              {/* <Button className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-2xl h-14 text-base font-medium">
                <Gift className="w-5 h-5 mr-2" />
                Continue
              </Button> */}
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-gray-400">{"Don't have an account? "}</span>
              <NavLink to={"/signup"}>

                <button className="text-blue-400 font-medium">Sign Up</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Music Player */}
      {/* <div className="fixed bottom-20 left-4 right-4">
        <div className="bg-gray-800/80 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <span className="text-lg">🎵</span>
              </div>
              <div>
                <div className="text-white font-medium">Unknown Artist</div>
                <div className="text-gray-400 text-sm">19.6.2024 1</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-8 h-8 flex items-center justify-center">
                <span className="text-white">⏮</span>
              </button>
              <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">▶</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <span className="text-white">⏭</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm">
        <div className="flex justify-around items-center py-3">
          <button className="p-2">
            <Lock className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2">
            <span className="w-6 h-6 text-gray-400">🎵</span>
          </button>
          <button className="p-2">
            <User className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2">
            <span className="w-6 h-6 text-gray-400">🎵</span>
          </button>
          <button className="p-2">
            <span className="w-6 h-6 text-gray-400">📁</span>
          </button>
        </div>
        <div className="text-center pb-2">
          <span className="text-red-500 text-sm font-medium">Youtube</span>
        </div>
      </div> */}
      <Circle_Loader isVisible={isLoading} message={ "Logging In..."} />
    </div>
  )
}
