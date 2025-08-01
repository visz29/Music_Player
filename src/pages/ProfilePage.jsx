

import { useContext, useEffect, useState } from "react"
import { ArrowLeft, User, Mail, Lock, Gift, Camera, Edit3, Settings, LogOut } from "lucide-react"
import CircleLoader from "../components/Circle_Loader.jsx"
import { playerContext } from "../context/PlayerContext.jsx"
import { getUser, updateUser } from "../utils/userAccount.js"
import { NavLink, useNavigate } from "react-router-dom"
import { saveUserData } from "../utils/saveLocalData.js"

// Custom Button Component
const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input Component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Music lover and tech enthusiast",
  })

  let context = useContext(playerContext)

  let navigate = useNavigate()

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



  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
    setUserData((prev) => ({ ...prev, [field]: value }))

  }

  const handleSave = async () => {
    setIsLoading(true)

    updateUser(userData).then((res) => {
      // console.log(res);

    })
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
    }, 2000)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    // Clear user data from local storage
    saveUserData({
      login: false,
      email: "",
      password: "",
      username: "",
    });
    // Clear user data from context
    context.setUserData({
      bio: "",
      createdAt: "",
      email: "",
      password: "",
      profilePic: "",
      updatedAt: "",
      username: "",
      _id: "",
    });
    // Simulate logout
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1500)
  }

  useEffect(() => {
    let user = context.userData
    setUserData({
      bio: user.bio,
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic,
      updatedAt: user.updatedAt,
      username: user.username,
      _id: user._id,
    })
  }, [context.userData])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if(!storedUser) {
      navigate('/login')
      return
    }
    console.log("Local Storage",storedUser);
    if (storedUser.login == false) {
      navigate('/login')
      return
    }
    

    if(context.userData.username != ""){
      return
    } 


    get_user({
      email: storedUser.email,
      password: storedUser.password,
      cookie: (document.cookie).split("=")[1]
    })

    console.log("Context User",context.userData);

    let user = context.userData
    setUserData({
      bio: user.bio,
      createdAt: user.createdAt,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic,
      updatedAt: user.updatedAt,
      username: user.username,
      _id: user._id,
    })

  }, [])

  const get_user = async ({ email, password, cookie }) => {

    console.log("email", email);
    console.log("password", password);
    console.log("cookie", cookie);
    let res = await getUser({ email, password, cookie })
      .then((res) => {
        // console.log(res);
        let user = res.response.user
        // console.log("user => ", user);

        if (res.status == true) {

          const userData = {
            login: true,
            email: user.email,
            password: user.password,
            username: user.username,
          };

          saveUserData(userData);
          // localStorage.setItem('userData', JSON.stringify(userData));

          // console.log(context.userData);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePic: reader.result }));
        setProfileData((prev) => ({ ...prev, profilePic: reader.result }));

        // Save the updated profile picture to local storage
        updateUser({...userData, profilePic: reader.result}).then((res) => {
          // console.log(res);

        })
      };
      reader.readAsDataURL(file);
    }

    handleSave() // Save changes after image upload


  }

  return (
    <div className="min-h-screen bg-black text-white z-1 pb-20 overflow-x-scroll">
      {/* Status Bar */}


      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <NavLink to="/tracks">
          <ArrowLeft className="w-6 h-6" />
        </NavLink>
        <div className="w-8 h-8 border-2 border-white/30 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-2">
        <div className="bg-gray-800/50 rounded-3xl p-6 backdrop-blur-sm">
          {/* Profile Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-700/80 px-6 py-3 rounded-2xl">
              <span className="text-gray-300 font-medium">My Profile</span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative">
                <div className="userimg w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center">
                  {/* <User className=" w-10 h-10 text-gray-400" /> */}
                  <img src={userData.profilePic || profileData.profilePic} alt="User" className=" w-full h-full object-cover rounded-full" />
                  <input onChange={(e) => handleImageChange(e)} type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{userData.username || profileData.username}</h2>
                <p className="text-gray-400 text-sm">{userData.bio || profileData.bio}</p>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">24</div>
                <div className="text-xs text-gray-400">Playlists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">156</div>
                <div className="text-xs text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">89</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">{userData.username}</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={userData.username || profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    disabled={!isEditing}
                    className={`bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0 ${!isEditing ? "opacity-70" : ""}`}
                  />
                  <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={userData.email || profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className={`bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0 ${!isEditing ? "opacity-70" : ""}`}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              {/* <div>
                <label className="text-gray-400 text-sm mb-2 block">Phone</label>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={`bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0 ${!isEditing ? "opacity-70" : ""}`}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">📱</span>
                </div>
              </div> */}

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Bio</label>
                <div className="relative">
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={userData.bio || profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className={`flex w-full bg-gray-700/30 border border-gray-600/50 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0 resize-none ${!isEditing ? "opacity-70" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {!isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-2xl h-14 text-base font-medium"
                  >
                    <Edit3 className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="flex-1 bg-red-600/80 hover:bg-red-600 text-white rounded-2xl h-14 text-base font-medium"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-2xl h-14 text-base font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-green-600/80 hover:bg-green-600 text-white rounded-2xl h-14 text-base font-medium"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>

            {/* Settings Options */}
            <div className="space-y-3 mt-6 pt-6 border-t border-gray-700/50">
              <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-700/30 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Account Settings</span>
              </button>
              <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-700/30 transition-colors">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Privacy & Security</span>
              </button>
              <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-700/30 transition-colors">
                <span className="w-5 h-5 text-gray-400">🎵</span>
                <span className="text-gray-300">Music Preferences</span>
              </button>
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
            <User className="w-6 h-6 text-blue-400" />
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

      {/* Circle Loader */}
      <CircleLoader isVisible={isLoading} message={isEditing ? "Saving changes..." : "Logging out..."} />
    </div>
  )
}
