"use client"

import { useMusic } from "@/context/music-context"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function FixedPlayer() {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    nextSong,
    prevSong,
    setVolume,
    seekTo,
    toggleLike,
  } = useMusic()

  const currentSong = songs[currentSongIndex]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Informações da música atual */}
        <div className="flex items-center w-1/4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center mr-3 flex-shrink-0">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="truncate">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-xs text-zinc-400 truncate">{currentSong.artist}</div>
          </div>
          <button onClick={() => toggleLike(currentSong.id)} className="ml-4 p-2 hover:bg-zinc-800 rounded-full">
            <Heart className={`h-4 w-4 ${currentSong.isLiked ? "text-green-500 fill-green-500" : "text-zinc-400"}`} />
          </button>
        </div>

        {/* Controles de reprodução */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-4 mb-1">
            <button className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </button>
            <button onClick={prevSong} className="p-1 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </button>
            <button onClick={togglePlay} className="p-2 bg-white rounded-full hover:bg-gray-200 text-black">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={nextSong} className="p-1 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>
            <button className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center w-full gap-2">
            <span className="text-xs text-zinc-400 w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={(value) => seekTo(value[0])}
              className="flex-1"
            />
            <span className="text-xs text-zinc-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controle de volume */}
        <div className="flex items-center justify-end w-1/4">
          <div className="flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-zinc-400" />
            <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} />
          </div>
        </div>
      </div>
    </div>
  )
}
