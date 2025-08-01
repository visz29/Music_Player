import { useContext, useEffect, useRef, useState } from "react";
import { MoreVertical, Heart, SortAsc } from "lucide-react";
import BasicHeader from "../components/BasicHeader.jsx";
import { playerContext } from "../context/PlayerContext.jsx";
import { getAllSongs } from "../utils/db.js";
import music from '../assets/music.png'
import { SearchLogo, SmallArrow } from "../assets/Svg.jsx";
import Music_sort_demo from "../components/Music_sort_demo.jsx";
import { SortDropdown } from "../components/sort-dropdown.jsx";
import sortSongs from "../utils/sortSongs.js";
import Search from "../components/Search.jsx";
import searchLocalSongs from "../utils/searchLocalSongs.js";
import '../style/track.css'

const tracks = [
  {
    id: 1,
    title: "Unknown Album",
    artist: "",
    duration: "03:09",
    img: "/music-placeholder.png"
  },
  {
    id: 2,
    title: "No Black Panther 2",
    artist: "Unknown Album",
    duration: "00:08",
    img: "/blackpanther.jpg"
  },
  {
    id: 3,
    title: "0A45AF8A2BF011463B03C...",
    artist: "Unknown Artist",
    album: "Unknown Album",
    duration: "00:15",
    img: "/artist1.jpg"
  },
  {
    id: 4,
    title: "1 BEAT Mashup",
    artist: "X2Download.com",
    duration: "05:31",
    img: "/music-placeholder.png"
  },
  {
    id: 5,
    title: "100000000 1867420661660...",
    artist: "Unknown Artist",
    duration: "04:04",
    img: "/user1.jpg"
  },
  {
    id: 6,
    title: "100000000 89450190168876...",
    artist: "Unknown Artist",
    duration: "00:18",
    img: "/user2.jpg"
  },
];


function Tracks() {
  let showDur = ()=>{}
  const [audio, setAudio] = useState("x")
  let audioRef = useRef()
  const [songs, setSongs] = useState([]);
  let [songList,setSongList] = useState([]);
  const [currentSrc, setCurrentSrc] = useState(null);
  let context = useContext(playerContext)
  const [selectedSort, setSelectedSort] = useState("Title")
  const [reverseOrder, setReverseOrder] = useState(false)
  const [searchBox, setSearchBox] = useState(false)

  useEffect(()=>{
    console.log(audioRef.current.duration);
    
  },[audioRef])
  

  useEffect(() => {
    document.title = "Music - Tracks"
    loadSavedSongs();
  }, []);

  const loadSavedSongs = async () => {
    const saved = await getAllSongs();
    setSongs(saved.map(song => ({
      ...song,
      blobUrl: URL.createObjectURL(song.blob),
    })));

    setSongList(saved.map(song => ({
      ...song,
      blobUrl: URL.createObjectURL(song.blob),
    })))
  };

  

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    for (let file of audioFiles) {
      const fileArt = await extractAlbumArt(file)
      const songData = {
        name: file.webkitRelativePath || file.name, // includes folder
        blob: file,
        art: fileArt
      };
      await saveSong(songData);
    }
    loadSavedSongs();
  };

  const playSong = (song) => {
    // console.log(song.blobUrl);
    
    context.setPlayingSong({
      channelTitle: "",
      songTitle: song.blob.name,
      songUrl: song.blobUrl,
      thumbnail: song.art || music,
      loading: false,
      status: true,
    })

  };
/// Drip Down List
document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const selectButton = customSelect.querySelector(".select-button");
    const dropdown = customSelect.querySelector(".select-dropdown");
    const options = dropdown.querySelectorAll("li");
    const selectedValue = selectButton.querySelector(".selected-value");

    let focusedIndex = -1;

    const toggleDropdown = (expand = null) => {
      const isOpen =
        expand !== null ? expand : dropdown.classList.contains("hidden");
      dropdown.classList.toggle("hidden", !isOpen);
      selectButton.setAttribute("aria-expanded", isOpen);

      if (isOpen) {
        focusedIndex = [...options].findIndex((option) =>
          option.classList.contains("selected")
        );
        focusedIndex = focusedIndex === -1 ? 0 : focusedIndex;
        updateFocus();
      } else {
        focusedIndex = -1;
        selectButton.focus();
      }
    };

    const updateFocus = () => {
      options.forEach((option, index) => {
        if (option) {
          option.setAttribute("tabindex", index === focusedIndex ? "0" : "-1");
          if (index === focusedIndex) option.focus();
        }
      });
    };

    const handleOptionSelect = (option) => {
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      selectedValue.textContent = option.textContent.trim(); // Update selected value

      if (option.dataset.value === "clear") {
        // Reset to the default value
        selectedValue.textContent = "Open this select menu";
        options.forEach((opt) => opt.classList.remove("selected"));
        return;
      }
    };

    options.forEach((option) => {
      option.addEventListener("click", () => {
        handleOptionSelect(option);
        toggleDropdown(false);
      });
    });

    selectButton.addEventListener("click", () => {
      toggleDropdown();
    });

    selectButton.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        toggleDropdown(true);
      } else if (event.key === "Escape") {
        toggleDropdown(false);
      }
    });

    dropdown.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusedIndex = (focusedIndex + 1) % options.length;
        updateFocus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusedIndex = (focusedIndex - 1 + options.length) % options.length;
        updateFocus();
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOptionSelect(options[focusedIndex]);
        toggleDropdown(false);
      } else if (event.key === "Escape") {
        toggleDropdown(false);
      }
    });

    document.addEventListener("click", (event) => {
      const isOutsideClick = !customSelect.contains(event.target);

      if (isOutsideClick) {
        toggleDropdown(false);
      }
    });
  });
});



useEffect(()=>{
  console.log(selectedSort,reverseOrder);
  // console.log(songs);
  
   let newSort = sortSongs(selectedSort,reverseOrder,songs)
  // console.log(newSort);
  // setSongs(newSort)
  // setSongs(songs)
  
  
},[selectedSort,reverseOrder,songs])

const changeSort = (option,reverse)=>{
  setSelectedSort(option)
  setReverseOrder(reverse)
  let newSort = sortSongs(option,reverse,songs)
  // console.log(newSort);
  setSongs(newSort)
    // setSongs(songs)
  }

  function searchClick(e){
        console.log("clicked ",e.target);
        setSearchBox(!searchBox)
    }
    function searchOneChange(e){
      console.log(e.target.value);
      let newSort = searchLocalSongs(songList,songs,e.target.value)
      setSongs(newSort)
      
    }

  return (
    <div className="w-full h-full max-w-[425px] overflow-y-hidden mx-auto bg-black text-white  font-sans ">
      {/* hidden audio tag */}
      <audio className="hidden" ref={audioRef} src={audio}></audio>
      {/* Header */}
      <BasicHeader />


      <div className="flex w-full items-center justify-between bg-transparent relative flex-col">
        <div className=" flex items-center justify-between w-full p-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-white/90">
          <button>⇄</button>
          <span className="text-lg font-semibold">{songs.length} Tracks</span>
        </div>
        <div className="flex items-center gap-4 text-pink-200">
          <span className="text-sm">
            
            <SortDropdown fun={changeSort} />
          </span>
          {/* <SortAsc size={18} /> */}
          <SmallArrow onClick={()=>{console.log("Clicked on SmallArrow");
          }} size={18} />
          {/* <SearchLogo size={18} /> */}
          <button onClick={searchClick}>
                  <SearchLogo style="pointer-events:none;" size={18}  />
                  </button>
          {/* <Heart size={18} /> */}
        </div>
        </div>
        <Search open={searchBox} fun={searchOneChange}/>
        {/* <div className="searchBox h-10 w-full right-0 top-20"></div> */}
      </div>

      <div className="songsParent divide-y h-8/10 overflow-scroll divide-neutral-800 pb-32  ">
        {songs.map((track,i) => (
          <div key={i} className="song flex items-center gap-4 p-3"
          onClick={()=>{playSong(track)}}
          >
            <img
              src={track.art}
              alt="cover"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <h3 className="text-sm font-semibold truncate">{track.blob.name}</h3>
              <p className="size text-xs text-gray-400 truncate">
                {(track.blob.size / (1024 * 1024)).toFixed(2) + " MB" || "Unknown Artist"}
              </p>
              <p className="size text-xs text-gray-400 truncate">
                {track.year || ""}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              
              <span className="text-xs text-white/80">{((track.duration.toFixed(2))/60).toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-pink-300" />
                <MoreVertical size={16} className="text-white/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracks