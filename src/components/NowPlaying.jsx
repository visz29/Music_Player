import { usePlayer } from "../context/PlayerContext.jsx";

export default function NowPlaying() {
  const { currentTrack } = usePlayer();

  return (
    currentTrack ? (
      <div className="p-2 bg-neutral-800 text-white flex items-center justify-between">
        <img src={currentTrack.image} alt="cover" className="w-12 h-12 rounded-md" />
        <div className="ml-2 flex-1">
          <h3 className="text-sm font-semibold">{currentTrack.title}</h3>
          <p className="text-xs">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button>⏯</button>
          <button>⏩</button>
        </div>
      </div>
    ) : null
  );
}
