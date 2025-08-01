import { forwardRef, useEffect, useState, useRef, useCallback, useMemo } from "react"

import '../../style/slider.css'

const Slider = ( {curTime,dur,fun}) => {
  // console.log(dur);
  const min = Math.floor((dur % 3600) / 60).toString().padStart(2, '0');
  const sec = Math.floor(dur % 60).toString().padStart(2, '0');
  // console.log(Number(`${min}.${sec}`), typeof Number(`${min}.${sec}`));
  
  // console.log("ref");
  // console.log(dur,"dur","=",curTime,"curTime");
  
  // console.log("curTime",curTime, typeof curTime);
  // console.log("curTime", curTime /100, typeof curTime);

  
  
  let rangeRef = useRef()
  const mins = Math.floor(dur / 60).toString().padStart(2, '0');
  const secs = Math.floor(dur % 60).toString().padStart(2, '0');
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [maxInput, setMaxInput] = useState(0)

  // setProgress(curTime)
  // Generate waveform data
  const waveformBars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    height: Math.random() * 40 + 10,
  }))
  
  const handleProgressChange = (e) => {
    // console.log(progress);
    
    // console.log("value",e.target.value, typeof e.target.value);
    setProgress(e.target.value)
    fun(e.target.value)
    // setProgress(Number(e.target.value))
    // console.log(waveformBars);
    
  }
  
  
  
  useEffect(()=>{
      // console.log(`${progress}`);
      setProgress(curTime)
      setMaxInput(dur)
    
    })
    
    
    


  return (
    <div className="text-black border-2 border-black w-full h-1/10 flex justify-center items-center">
      {/* <div className="border-2 border-purple-400 w-9/10 h-3/10  "> */}
        {/* <input className="w-full h-full pointer-events-auto" type="range" min="0" max={3.5} step="0.1" name="" id="" /> */}
        {/* Waveform container */}
      <div className="relative mb-6 w-8/10 h-16">
        {/* Waveform bars background */}
        <div className="absolute w-full inset-0 flex items-end justify-between gap-[1px] pointer-events-none">
          {waveformBars.map((bar, index) => {
            const barProgress = (index / waveformBars.length) * 100
            // console.log(barProgress);
            
            const isActive = barProgress <= (progress / maxInput) * 100

            return (
              <div
                key={bar.id}
                className={`w-1 rounded-sm transition-colors duration-150 ${isActive ? "bg-gray-600" : "bg-gray-300"}`}
                style={{ height: `${bar.height}px` }}
              />
            )
          })}
        </div>

        {/* Custom styled range input */}
        <input
          type="range"
          min="0"
          max={maxInput}
          step={0.01}
          value={progress}
          onChange={handleProgressChange}
          className="waveform-range pointer-events-auto"
          ref={rangeRef}
        />

        {/* Progress indicator line */}
        <div
          className="absolute top-0 w-0.5 h-full bg-gray-700 pointer-events-none transition-all duration-0"
          style={{ left: `${(progress / maxInput) * 100}%` }}
        />
      </div>
      {/* </div> */}
    </div>
  )
}



export { Slider }
