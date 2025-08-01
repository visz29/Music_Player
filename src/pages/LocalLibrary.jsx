import React, { useContext, useEffect, useState } from 'react';
import { saveSong, getAllSongs, deleteAllSongs, deleteSongsByFolder, deleteSongByName } from '../utils/db.js';
import extractAlbumArt from '../utils/extractAlbumArt.js';
import '../style/localLibrary.css'

import { playerContext } from '../context/PlayerContext.jsx';
import { parseBlob } from 'music-metadata-browser';
import { AddFolder, DawnArrow, Folder } from '../assets/Svg.jsx';


function LocalLibrary() {
  const [songs, setSongs] = useState([]);
  const [currentSrc, setCurrentSrc] = useState(null);
  let context = useContext(playerContext)
  let [folder, setFolder] = useState([{ name: "Empty - Please First Import Any folder" }])
  let [removeBox, setRemoveBox] = useState(true)
  let [removeBox1, setRemoveBox1] = useState(true)
  let [boxCss, setBoxCss] = useState("h-0")
  let [boxCss1, setBoxCss1] = useState("h-0")

  // useEffect(() => {
  //   loadSavedSongs();
  //   console.log(context.folders);

  // }, []);

  const loadSavedSongs = async () => {
    const saved = await getAllSongs();
    console.log(saved);
    
    setSongs(saved.map(song => ({
      ...song,
      blobUrl: URL.createObjectURL(song.blob),
    })));
    return saved;
  };



  const handleFileChange = async (e) => {
    console.log(e);

    const files = Array.from(e.target.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    for (let file of audioFiles) {
      // console.log(  (file.webkitRelativePath).slice(0, (file.webkitRelativePath).indexOf("/")));

      const metadata = await parseBlob(file);
      const fileArt = await extractAlbumArt(file)
      const songData = {
        name: file.webkitRelativePath || file.name,
        blob: file,
        art: fileArt,
        title: metadata.common.title || 'Unknown',
        artist: metadata.common.artist || 'Unknown',
        album: metadata.common.album || 'Unknown',
        composer: metadata.common.composer || 'Unknown',
        genre: metadata.common.genre?.[0] || 'Unknown',
        year: metadata.common.year || 'Unknown',
        lyrics: metadata.common.lyrics || '',
        duration: metadata.format.duration || 0,
        bitrate: metadata.format.bitrate || 0,
        folderName: (file.webkitRelativePath).slice(0, (file.webkitRelativePath).indexOf("/")),
        // albumartist: metadata.common.albumartist || 'Unknown',
        // track: metadata.common.track || { no: 0, of: 0 },
        // disk: metadata.common.disk || { no: 0, of: 0 },
        // comment: metadata.common.comment?.[0] || '',
        // sampleRate: metadata.format.sampleRate || 0,
        // channels: metadata.format.numberOfChannels || 0,
        // codec: metadata.format.codec || '',
        // container: metadata.format.container || '',
        // tagTypes: metadata.format.tagTypes || [],
      };

      await saveSong(songData);
    }
    loadSavedSongs();
    loadSongsAndSetFolderFiles()
  };

  const handleSongFileChange = async (e) =>{
    const files = Array.from(e.target.files);

  // Filter only audio files
  const audioFiles = files.filter(file => file.type.startsWith('audio/'));

  for (let file of audioFiles) {
    console.log(  (file));
    const metadata = await parseBlob(file);
    const fileArt = await extractAlbumArt(file);

    const songData = {
      name: file.name,
      blob: file,
      art: fileArt,
      title: metadata.common.title || 'Unknown',
      artist: metadata.common.artist || 'Unknown',
      album: metadata.common.album || 'Unknown',
      composer: metadata.common.composer || 'Unknown',
      genre: metadata.common.genre?.[0] || 'Unknown',
      year: metadata.common.year || 'Unknown',
      lyrics: metadata.common.lyrics || '',
      duration: metadata.format.duration || 0,
      bitrate: metadata.format.bitrate || 0,
      folderName: 'Single_Songs', // Optional: Set a default or remove this key if not needed
    };

    await saveSong(songData);
  }

  loadSavedSongs();
  }


  useEffect(() => {
    setRemoveBox(!removeBox)
    setRemoveBox1(!removeBox1)
    setBoxCss("h-0")
    setBoxCss1("h-0")
  }, [songs])

  let folders = []
  const setFoldersFils = (folderName, songName) => {
    console.log(folderName);
    
    if (folders.length == 0) {
      folders.push({ name: folderName, songs: [] })
    } else if (folders.length > 0) {
      let arr = []
      folders.forEach((folder) => {
        arr.push(folder.name)
      })
      let check = arr.includes(folderName)
      if (check == true) {
        // console.log(folderName);
      } else if (check == false) {
        // console.log(folderName);
        folders.push({ name: folderName, songs: [] })
      }
    }
    folders.forEach((folder) => {
      if (folder.name == folderName) {
        // console.log(folder);
        folder.songs.push(songName)
      }
    })

    setFolder(folders)
  }

  useEffect(() => {
    console.log("folders", folder);
    importFolderList()

  }, [folder])


  function loadSongsAndSetFolderFiles() {

    loadSavedSongs().then((songs) => {
      // console.log(songs.length);

      songs.forEach(song => {
        
        let folderName = (song.name).slice(0, (song.name).indexOf("/"))

        setFoldersFils(song.folderName, song.blob.name)
      });
      context.setFolders(folders)

    }).catch((err) => {
      console.log("somthis error on home.jsx in loadSavedSongs()", err);

    })
  }
  useEffect(() => {
   
    loadSongsAndSetFolderFiles()

  }, [])

  function importFolderList(e = false) {
    // console.log(e.target);
    if (e !== false) {

      if (e.target.id == 'imortfolder') {

        if (folder.length > 0) {

          if (removeBox == true) {
            // console.log(folder.length * 10);
            let size = folder.length * 10
            setBoxCss(`h-${size}`)
          } else {
            setBoxCss("h-0")
          }
          setRemoveBox(!removeBox)
        }
      }
    } else {
      setRemoveBox(!removeBox)
      setBoxCss("h-0")
    }

  }

  function importSongList(e = false) {
    if (e !== false) {
      
      if (e.target.id == 'importsong') {
        
        if (folder.length > 0) {
          
          if (removeBox1 == true) {
          
            let arr = songs.filter((e)=> {if(e.folderName == "Single_Songs" ){
              return e
            } })
            console.log(arr.length);
            
            let size = arr.length * 10
            
            setBoxCss1(`h-${size}`)
          } else {
            
            console.log(e.target.id);
            setBoxCss1("h-0")
          }
          setRemoveBox1(!removeBox1)
        }
      }
    } else {
      setRemoveBox1(!removeBox1)
      
      setBoxCss1("h-0")
    }

  }

  function removeFolder(e, f) {
    console.log("remove Folder", e.target, f.name);
    deleteSongsByFolder(f.name)

    loadSavedSongs().then((songs) => {
      console.log(songs.length);
      if (songs.length == 0) {
        setFolder([])
      }
      songs.forEach(song => {

        let folderName = (song.name).slice(0, (song.name).indexOf("/"))

        setFoldersFils(folderName, song.blob.name)
      });
      context.setFolders(folders)
        ;
    }).catch((err) => {
      console.log("somthis error on home.jsx in loadSavedSongs()", err);

    })

  }
  async function removeSong(e, s) {
    console.log("remove Song", e.target, s.folderName);
    await deleteSongByName(s.name)

    loadSavedSongs().then((songs) => {
      console.log(songs.length);
      if (songs.length == 0) {
        setFolder([])
      }
      songs.forEach(song => {

        let folderName = s.folderName

        setFoldersFils(folderName, song.blob.name)
      });
      context.setFolders(folders)
        ;
    }).catch((err) => {
      console.log("somthis error on home.jsx in loadSavedSongs()", err);

    })

  }

  return (
    <div className='library h-full overflow-scroll w-full bg-fuchsia-200/20 p-4'>
      <button onClick={async () => {
        await deleteAllSongs();
        setSongs([]); // clear UI
      }}>
        🗑️ Delete All Songs
      </button>
      <input
        className=''
        type="file"
        accept="audio/*"
        multiple
        webkitdirectory="true"
        onChange={handleFileChange}
      />
      <div onClick={(e) => { importFolderList(e) }} id='imortfolder' className="imortfolder w-full  bg-gray-700 mt-2 flex flex-col  items-center justify-center p-3 rounded-sm relative transition-all duration-500" >

        <div className='pointer-events-none w-full h-10 flex flex-row  items-center justify-between  rounded-sm relative'>
          <Folder size={20} />
          <span className='pointer-events-none'>Import Folder's</span>
          <div className='w-20 h-full flex justify-center bg-amber-100/20 items-center rounded-2xl relative overflow-hidden'>
            <input
              className='absolute w-full h-full text-transparent pointer-events-auto'
              type="file"
              accept="audio/*"
              multiple
              webkitdirectory="true"
              onChange={handleFileChange}
            />
            <AddFolder size={20} />
          </div>
          <DawnArrow size={40} />
        </div>
        <div className={`w-full ${boxCss}  bg-purple-900 mt-2 transition-all duration-500 overflow-hidden`}>
          {folder.map((f, i) => {

            let btn = false
            if (f.songs) {
              btn = true
            }

            return (

              <div key={i} className="pointer-events-none flex flex-row justify-between p-2 h-10 mb-1">
                <h1 className="pointer-events-none">0/{f.name}</h1>

                {btn == true ? <button onClick={(e) => { removeFolder(e, f) }} className='pointer-events-auto '>REMOVE</button> : ""}
               </div>
            )
          })}
        </div>
      </div>


      {/* Single music upload */}
      <div onClick={(e) => { importSongList(e) }} id='importsong' className="imortsongs w-full  bg-gray-700 mt-2 flex flex-col  items-center justify-center p-3 rounded-sm mb-30 relative  " >

        <div className='pointer-events-none w-full h-10 flex flex-row  items-center justify-between  rounded-sm relative'>
          <Folder size={20} />
          <span className='pointer-events-none'>Import Songs's</span>
          <div className='w-20 h-full flex justify-center bg-amber-100/20 items-center rounded-2xl relative overflow-hidden'>
            <input
              className='absolute w-full h-full text-transparent pointer-events-auto'
              type="file"
              accept="audio/*"
              multiple
              // webkitdirectory="true"
              onChange={handleSongFileChange}
            />
            <AddFolder size={20} />
          </div>
          <DawnArrow size={40} />
        </div>
        <div className={`songList w-full ${boxCss1} mt-2  overflow-hidden `}>
          {songs.map((f, i) => {
          
            let btn = false
            if (f.folderName != "Single_Songs") {
              
              return 
            }else{
              
              btn = true
            
              return (
  
                <div key={i} className="pointer-events-none transition-all duration-700 bg-purple-500/20 flex flex-row justify-between p-1 h-10 mb-1 overflow-clip">
                  
                  <h1 className="pointer-events-none text-sm w-8/10">0/{f.name}</h1>
  
                  {btn == true ? <button onClick={(e) => { removeSong(e, f) }} className='pointer-events-auto '>REMOVE</button> : ""}
                 </div>
              )
            }

          })}
        </div>
      </div>
  
    </div>
  );
}

export default LocalLibrary;
