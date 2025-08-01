import { NavLink } from "react-router-dom";
import { Home, Music, Youtube,User, Library, Folder, PlayCircle, } from "lucide-react"; // or use custom icons

let NavLinkCss = "transition-all duration-500 overflow-hidden";
let activeIconStyle = "w-5 h-5 transition-all duration-500 text-cyan-400 "
let inactiveIconStyle = "w-5 h-5 transition-all duration-500 text-gray-500";

export default function Navbar() {
  {/* Bottom Navigation */}
  return (
      <nav className="bottomNav h-20 z-1 absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 pointer-events-auto">
        <div className="flex h-full justify-around items-center py-2 ">
          <div className="flex flex-col items-center gap-1 ">
            <NavLink to={"/"} className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`} >
           {({isActive})=>(
            <>
             <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <Home className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
            </div>
              <span className={`text-xs text-cyan-400`}>Home</span>
            </>
           )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"tracks"} className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`} >
              {({isActive}) => (
                <>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <Music className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
              
            </div>
            <span className={`text-xs text-cyan-400`}>Tracks</span>
                </>
              )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"/profile"} className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`}>
              {({isActive}) => (
                <>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">

            <User className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
              </div>

              <span className={`text-xs text-cyan-400`}>Account</span>
              </>
              )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"library"} className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`}>
              {({isActive}) => (
                <>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">

            <Library className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
              </div>
              <span className={`text-xs text-cyan-400`}>Tracks</span>
                </>
              )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"folder"} className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`}>
              {({isActive})=> (
                <>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">

            <Folder className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
              </div>
              <span className={`text-xs text-cyan-400`}>Tracks</span>
                </>
              )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <NavLink to={"youtube"}  className={ ({isActive}) => isActive ? `h-15  translate-y-0 ${NavLinkCss}` : `h-10 translate-y-0 ${NavLinkCss}`}>
              {({isActive}) => (
                <>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">

              <PlayCircle className={`${isActive ? activeIconStyle : inactiveIconStyle}`} />
              </div>
              <span className={`text-xs text-cyan-400`}>Tracks</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
  );
}
 