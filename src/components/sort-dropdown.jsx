

import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight, ArrowUpDown, Filter } from "lucide-react"
import { Button } from "../components/ui/button.jsx"

export function SortDropdown({fun}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Title")
  const [reverseOrder, setReverseOrder] = useState(false)
  // const [selected, setSelected] = useState("title")

  const sortOptions = [
    { label: "Title", hasSubmenu: true },
    { label: "Year", hasSubmenu: true },
    { label: "Date Added", hasSubmenu: true },
    { label: "Size", hasSubmenu: true },
    { label: "Folder", hasSubmenu: true },
    { label: "Album", hasSubmenu: true },
    { label: "Artist", hasSubmenu: true },
    { label: "Genre", hasSubmenu: true },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSortSelect = (option) => {
    setSelectedSort(option)
    fun(option,reverseOrder)
    setIsOpen(false)
    
  }

  useEffect(()=>{
    fun(selectedSort,reverseOrder)
  },[reverseOrder])
  
  const toggleReverseOrder = () => {
    setReverseOrder(!reverseOrder)
    console.log(reverseOrder);
 
  }

  return (
    <div className="relative">
      {/* Header with Title and Icons */}
      <div className="flex items-center justify-between p-0 bg-rose-100/0">
        {/* <span className="text-gray-600 font-medium">racks</span> */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-gray-700 hover:bg-rose-200 font-medium text-lg"
          >
            {selectedSort}
            <ChevronDown className="w-5 h-5" />
          </Button>
          {/* <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-rose-200">
            <Filter className="w-5 h-5" />
          </Button> */}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute w-60 top-full -right-16 z-50 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Reverse Order Option */}
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            onClick={toggleReverseOrder}
          >
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Reverse Order</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                reverseOrder ? "border-gray-600 bg-gray-600" : "border-gray-400"
              }`}
            >
              {reverseOrder && <div className="w-3 h-3 rounded-full bg-white"></div>}
            </div>
          </div>

          {/* Sort Options */}
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSortSelect(option.label)}
            >
              <div className="flex items-center gap-3">
                <ChevronRight className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
    </div>
  )
}
