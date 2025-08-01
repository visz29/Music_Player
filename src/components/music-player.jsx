import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { LucidePlay, Play, SkipForward, PauseIcon } from "lucide-react"
import { Slider } from './ui/slider.jsx';
import { playerContext } from '../context/PlayerContext.jsx';
import apt from '../assets/apt.mp3'
import { blobToBase64 } from './fetchAndSaveMP3.js';
import music from '../assets/music.png'
import { Music_symbole, SmallPinner } from '../assets/Svg.jsx';




let flag = 0;
function musiPlayer() {

  let audioTag = useRef()

  let currentPlaying = useContext(playerContext).playingSong
  let [image, setImage] = useState("-")
  let [songTitle, setSongTitle] = useState("-")
  let [channelTitle, setChannelTitle] = useState("-")
  let [songLink, setSongLink] = useState(`${apt}`)
  let [songLoading, setSongLoading] = useState(false)
  let [song, setSong] = useState("-")
  let [currentTime, setCurrentTime] = useState(0)
  let [duration, setDuration] = useState(0)
  let [timeUpdate, setTimeupdate] = useState(0)
  let [textColor, setTextColor] = useState("white")
  /////////////////////////////////////////////////
  let [expandIs, setExpandIs] = useState(false)
  let [imageCss, setImageCss] = useState("w-3/10 mr-1 h-full")
  let [mainBoxCss, setMainBoxCss] = useState("absolute h-9/22 flex-row")
  let [controls, setControls] = useState("h-full w-1/10")
  let [info, setInfo] = useState(" w-6/10 h-full")
  let [audioStatus, setAudioStatus] = useState(false)

  let first = <PauseIcon id='pause' className=" h-full w-full fill-black pointer-events-none" />
  let second = <LucidePlay id='play' className="h-full w-full fill-black pointer-events-none" />

  let [playButton, setPlayButton] = useState(first)

  useEffect(()=>{
    const isPlaying = !audioTag.current.paused;
      console.log(isPlaying ? "Playing" : "Paused");
      console.log(isPlaying);
      audioTag.current?.pause();
      setPlayButton(second);
      setAudioStatus(false);

  },[])

useEffect(() => {
  audioStatus ? setPlayButton(first) : setPlayButton(second)
  // setTimeout(() => {
    
  //   audioStatus ? audioTag.current?.play() : audioTag.current?.pause()
  // }, 1000);
},[audioStatus])

  async function fetchAndSaveMP3(url) {
    // console.log(url);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      // localStorage.setItem('cachedSong', base64);
      return base64;
    } catch (error) {
      console.error("Error fetching MP3:", error);
    }
  }
  // console.log(useContext(playerContext).playingSong);
  useEffect(() => {
    setImage(currentPlaying.thumbnail)
    setChannelTitle(currentPlaying.channelTitle)
    setSongTitle(currentPlaying.songTitle)
    console.log(currentPlaying);
    setSongLoading(currentPlaying.loading)

    fetchAndSaveMP3(currentPlaying.songUrl).then((url) => {
      if (url) {
        setSong(url);
      }
    });

    setPlayButton(first)
    flag = 1
    setAudioStatus(currentPlaying.loading == false ? true : false)
      setAudioStatus(currentPlaying.status == true ? true : false);

      setTimeout(() => {
    
    currentPlaying.status ? audioTag.current?.play() : audioTag.current?.pause()
  }, 200);
  }, [currentPlaying])

  useEffect(() => {
    const audio = audioTag.current;
    // console.log(audio.currentTime);
    
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(Math.floor(audio.currentTime));
      setDuration(Math.floor(audio.duration));
      // console.log(audio.duration);
      
    };
    audioTag.current?.pause();
      setPlayButton(second);
      setAudioStatus(false);
    // Register event only once audio is ready
    audio.addEventListener('timeupdate', updateTime);
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  
  function runInterval(e) {
    setTimeupdate(audioTag.current.currentTime)
    // console.log(Math.floor(currentTime) /100,'currentTime');
    // console.log(audioTag.current.currentTime);
    

  }
  // intervel(runInterval)


  function getRange(curRange) {
    // console.log(curRange, typeof curRange);
    // console.log('CurRange',curRange, typeof curRange);
    audioTag.current.currentTime = curRange
  
  }

  //////////////////////  DEsigning /////////////////
  ///////////////////////////////////////////////////
 
  function btnHanddler(e) {
    // console.log(e.target);
    

    let childId = ""
    if (e.target.children[0].id != "") {
      childId = e.target.children[0].id
    } else if (e.target.children[1].id != "") {
      childId = e.target.children[1].id
    }

    if (childId == "pause") {
      // console.log(childId);
      audioTag.current?.pause()
      
      setPlayButton(second)
    } else if (childId == "play") {
      // console.log(childId);
      audioTag.current?.play()
      setPlayButton(first)
      // setDuration( Number(`${mins}.${secs}`))
    }

    // if (flag == 0) {
    //   setPlayButton(first)
    //   flag = 1;
    // } else if (flag == 1) {
    //   setPlayButton(second)
    //   flag = 0;
    // }
  }
  let screenHeight = window.screen.height-40
  screenHeight = String(`h-${screenHeight}`)

  function expand(e) {
    if (e.target.id == "main") {
      console.log(e.target.id);
      console.log(screenHeight, typeof screenHeight );
      
      setExpandIs(true)
      setMainBoxCss(`stickt -translate-y-1 bottom-0 h-full flex-col pointer-events-none items-center`)
      setImageCss("w-8/10 mr-0 h-4/10 mt-15 rounded-4xl")
      setControls("h-2/22 w-full pointer-events-auto pb-5 flex flex-row  ")
      setInfo("w-full h-2/10 items-center")
    }
  }

  function deExpand(e) {
    if (e.target.id == "closeBtn") {

      console.log(e.target);
      setExpandIs(false)
      setImageCss("w-3/10 mr-1 h-full")
      setMainBoxCss("absolute h-17 flex-row pointer-events-auto")
      setControls("h-full w-1/10 pointer-events-auto")
      setInfo(" w-6/10 h-full")
    }

  }

  return (

    <div
      id='main'
      onClick={expand}
      className={`${mainBoxCss} transition-all duration-1000 backdrop-blur-md  ease-in-out overflow-hidden bg-purple-500/20 flex rounded-xl w-18/19  bottom-20 border-2 border-white/60 h-17 pointer-events-auto`}>

      {/* hidden audio Tag */}
      <audio
        className='hidden'  src={song} ref={audioTag}
        onTimeUpdate={runInterval}
      ></audio>


      {/* // close Arrow  */}
      {expandIs && <div onClick={deExpand} id='closeBtn' className='absolute w-9 h-9 top-5 left-5 z-3  pointer-events-auto'>
        <svg viewBox="0 0 208 165" fill="none" className='w-9 h-9 pointer-events-none'>
          <path d="M185.5 76.5L199.5 63.5V8.5L102.5 100.5L8.5 8.5V60L102.5 157L152 108.5" stroke={textColor} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>}

      <div className={`imageBox ${imageCss}  rounded-md object-cover border-amber-600/0 border-2 pointer-events-none flex justify-center items-center relative`}>
      {songLoading ? <SmallPinner size={48} /> : ""}
      {/* <SmallPinner size={48} /> */}
      <img src={image ? image : music} alt="Album cover" className={`w-full h-auto   object-cover  border-2 pointer-events-none`} />
         </div>




      {/* Track Information */}
      <div className={`info ${info} flex-1  flex flex-col justify-center text-${textColor} pointer-events-none`}>
        <h3 className={`text-sm font-medium text-${textColor} truncate`}>{songTitle}</h3>
        <p className={`text-xs text-${textColor} truncate`}>{channelTitle}</p>
      </div >

      {expandIs &&
        <div className={`w-full p-2 text-${textColor} h-1/18 mb-29 flex flex-row justify-between`}>
          <h1>{`${Math.floor(audioTag.current.currentTime / 60).toString().padStart(2, '0')}.${Math.floor(audioTag.current.currentTime % 60).toString().padStart(2, '0')}`}</h1>
          <h1>{`${Math.floor(audioTag.current.duration / 60).toString().padStart(2, '0')}.${Math.floor(audioTag.current.duration % 60).toString().padStart(2, '0')}`}</h1>
        </div>
      }
      {expandIs && <Slider curTime={currentTime} dur={duration} fun={getRange} />}


      {/* Playback Controls */}

      <div size="sm" variant="ghost" onClick={btnHanddler} className={`controls ${controls} flex justify-center items-center  p-0 z-0 text-white `}>
        {expandIs && <div className='w-6/10 h-6/10 relative flex justify-center items-center '>
          <svg width="56" height="51" viewBox="0 0 56 51" fill="none" className='w-full h-full'>
            <path d="M30.1363 10.2744L39.7843 4.55747C43.0004 3.3324 49.9952 2.7607 52.2465 10.2744V38.8593C52.1125 42.6706 49.4324 49.3948 39.7843 45.8013L17.6742 32.7339C14.7261 30.8283 10.2773 25.6286 16.0661 20.0749L21.6942 15.1747" stroke={textColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M3 3.5V30.5" stroke={textColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M3.5 40.5V48" stroke={textColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>}

        {playButton}

        {expandIs && <div className='w-6/10 h-6/10 relative flex justify-center items-center'><svg className='w-full h-full ' width="56" height="51" viewBox="0 0 56 51" fill="none">
          <path d="M25.8637 9.77444L16.2157 4.05747C12.9996 2.8324 6.00476 2.2607 3.75354 9.77444V38.3593C3.88754 42.1706 6.56756 48.8948 16.2157 45.3013L38.3258 32.2339C41.2739 30.3283 45.7227 25.1286 39.9339 19.5749L34.3058 14.6747" stroke={textColor} strokeWidth="6" strokeLinecap="round" />
          <path d="M53 3V30" stroke={textColor} strokeWidth="6" strokeLinecap="round" />
          <path d="M52.5 40V47.5" stroke={textColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg></div>}
      </div>


    </div>
  )
}

export default musiPlayer