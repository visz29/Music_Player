

export default function Circle_Loader({ isVisible, message = "Loading..." }) {
  if (!isVisible) return null

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center">
      {/* Backdrop/Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center gap-4 animate-in zoom-in duration-300">
        {/* Circle Loader */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-gray-600/30 rounded-full"></div>

          {/* Spinning Ring */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>

          {/* Inner Glow Effect */}
          <div
            className="absolute top-2 left-2 w-12 h-12 border-2 border-transparent border-t-blue-400/50 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>

        {/* Loading Text */}
        {message && <div className="text-white text-sm font-medium animate-pulse">{message}</div>}

        {/* Loading Dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
