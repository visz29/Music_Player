

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Gift, Cloud, UserPlus } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { signup } from "../utils/userAccount.js"
import Circle_Loader from "../components/Circle_Loader.jsx"
import { toast , Bounce, Flip, Zoom, Slide } from 'react-toastify';

// Custom Button Component
const Button = ({ children, className = "", fun, data, ...props }) => {
    // console.log(data);

    return (
        <button
            onClick={(e) => { fun(e, data) }}
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



export default function SignUp() {
    const navigate = useNavigate()

    const [rePassError, setRePassError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passError, setPassError] = useState("")
    const [mainError, setMainError] = useState("")

    const [loader, setLoader] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "vishal",
        email: "visz@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
        // code: "",
    })

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const signupBtn = async (e, data) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // console.log(data);

        // Validation
        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            setMainError("Please fill all input fields");
            return;
        }

        if (!data.email.includes("@gmail.com")) {
            setMainError("Please enter a valid Gmail address");
            return;
        }

        if (data.password.length < 8) {
            setMainError("Password must be at least 8 characters long");
            return;
        }

        if (data.password !== data.confirmPassword) {
            setMainError("Passwords and Confirm Password do not match");
            return;
        }

        setMainError(""); // Clear any previous errors
        console.log("Sending data now...");
        setLoader(true)

        try {
            await signup(data)
                .then((res) => {
                    setLoader(false)
                    console.log("Signup response:", res);
                    setMainError("Account Created SuccessFully GO on Sign In Page")
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        // code: "",
                    })
                    // toast.success('Signup successful! Please log in.');
                    toast.success('🦄 Sign Up SuccessFully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => {
                        
                        navigate('/login', {
                            state: { message: 'Signup successful! Please log in.' },
                        });
                    }, 2000);

                })
        } catch (err) {
            setLoader(false)
            console.error("Signup failed:", err);
            setMainError(`Signup failed. ${err.response.data.msg}`);
            toast.error('SignUp Faild : email $ username already registered', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-scroll z-1 pb-20">

            <Circle_Loader isVisible={loader} />
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-6 ">
                <NavLink to={"/login"}>
                    <ArrowLeft className="w-6 h-6" />
                </NavLink>
                <div className="w-8 h-8 border-2 border-white/30 rounded-full">

                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 mt-2 pb-4">
                <div className="bg-gray-800/50 rounded-3xl p-6 backdrop-blur-sm">
                    {/* Sign Up Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-700/80 px-6 py-3 rounded-2xl">
                            <span className="text-gray-300 font-medium">Create Account</span>
                        </div>
                    </div>

                    {/* Sign Up Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 py-4">
                            <div className="w-10 h-10 bg-gray-700/50 rounded-xl flex items-center justify-center">
                                <UserPlus className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="text-lg font-medium">Join Us</span>
                        </div>

                        {/* Verification Code Section */}
                        {/* <div className="bg-gray-700/20 rounded-2xl p-4 mb-6">
              <div className="text-gray-400 text-sm mb-3">Code sent to your email</div>
              <Input
                type="text"
                placeholder="Code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
              />
            </div> */}

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
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
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                                    />
                                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
                                <p>{emailError}</p>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-2 block">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                                <p>{passError}</p>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        className="bg-gray-700/30 border-gray-600/50 rounded-2xl h-14 px-4 pr-12 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                <p>{rePassError}</p>
                            </div>
                            <p>{mainError}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8">
                            <Button className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-2xl h-14 text-base font-medium">
                                <Cloud className="w-5 h-5 mr-2" />
                                Verify
                            </Button>
                            <button onClick={(e) => { signupBtn(e, formData) }} className="flex-1 bg-green-600/80 hover:bg-green-600 text-white rounded-2xl h-14 text-base font-medium inline-flex items-center justify-center   transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background">
                                <Gift className="w-5 h-5 mr-2" />
                                Sign Up
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center mt-6">
                            <span className="text-gray-400">Already have an account? </span>
                            <NavLink to={"/login"}>
                                <button className="text-blue-400 font-medium">Sign In</button>
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
        </div>
    )
}
