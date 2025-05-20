"use client"

import { useMusic } from "@/context/music-context"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function MusicPlayer() {
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
    <div className="bg-zinc-800 rounded-lg p-6 max-w-3xl mx-auto shadow-xl">
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
            <Heart className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{currentSong.title}</h3>
          <p className="text-zinc-400">{currentSong.artist}</p>
        </div>
        <button onClick={() => toggleLike(currentSong.id)} className="p-2 rounded-full hover:bg-zinc-700">
          <Heart className={`h-6 w-6 ${currentSong.isLiked ? "text-green-500 fill-green-500" : "text-zinc-400"}`} />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-zinc-400 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => seekTo(value[0])}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={prevSong} className="p-2 rounded-full hover:bg-zinc-700">
            <SkipBack className="h-5 w-5" />
          </button>
          <button onClick={togglePlay} className="p-3 bg-green-500 rounded-full hover:bg-green-400 text-black">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <button onClick={nextSong} className="p-2 rounded-full hover:bg-zinc-700">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-32">
          <Volume2 className="h-4 w-4 text-zinc-400" />
          <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} />
        </div>
      </div>
    </div>
  )
}
