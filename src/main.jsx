import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PlayerContext from './context/PlayerContext.jsx'

// import { Buffer } from 'buffer'; // ✅ Use named import

// window.Buffer = Buffer; // 👈 attach Buffer globally




createRoot(document.getElementById('root')).render(
  <PlayerContext >

    <App />
  </PlayerContext>
  
)
