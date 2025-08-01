import React, { useContext, useEffect, useState } from 'react'
import { playerContext } from '../context/PlayerContext.jsx';
import music from '../assets/music.png'

function SongsOnFolder(songs) {
    console.log(songs.songs);
    
    const context = useContext(playerContext)
    let [Songs,setSongs] = useState([])
    

    useEffect(()=>{
        console.log(songs);
        
        setSongs(songs.songs)
    },[])

    

    const playSong = (song) => {
        console.log(song.blobUrl);
        
        context.setPlayingSong({
          channelTitle: "",
          songTitle: song.blob.name,
          songUrl: song.blobUrl,
          thumbnail: song.art || music,
        })
    
    
        // setCurrentSrc(song.blobUrl);
      };
  return (
    <div className=''>
        {Songs.map((song, idx) => (
                  <li key={idx}>
                    <div className='h-20 w-full bg-purple-400/20 mb-1 flex flex-row justify-between rounded-4xl overflow-hidden'>
                      <div className='imgBox h-full w-25 mr-2 overflow-hidden flex justify-between items-center '>
                        <img src={song.art || music} className='h-20 w-full rounded-r-3xl rounded-l-full bg-cover bg-transparent' alt="Imgae" />
                      </div>
                      <h6 className=' text-sm w-6/10'>{song.name}</h6>
                      <button onClick={() => playSong(song)}>
                        ▶️
                      </button>
                    </div>
                  </li>
                ))}
    </div>
  )
}

export default SongsOnFolder