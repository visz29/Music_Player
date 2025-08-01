
import {
  Menu,
  Settings,
  Search
} from "lucide-react"
import { NavLink } from 'react-router-dom'

function BasicHeader() {
    {/* Header */}
          
  return (
    
          <div className="flex sticky justify-between items-center px-4 py-4">
            <Menu className="w-6 h-6" />
            <div className="flex items-center gap-4">
              <Search className="w-6 h-6" />
              <NavLink to={"/setting"} >

              <Settings className="w-6 h-6" />
              </NavLink>
            </div>
          </div>
  )
}

export default BasicHeader