"use client"

import { Play, Clock, Heart } from "lucide-react"
import { useMusic } from "@/context/music-context"

export function Playlist() {
  const { songs, currentSongIndex, isPlaying, playSong, togglePlay, toggleLike } = useMusic()

  return (
    <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-zinc-400">Playlist</div>
            <h3 className="text-4xl font-bold mb-2">Nossa História em Músicas</h3>
            <p className="text-zinc-400">{songs.length} músicas especiais que marcaram nossos momentos</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isPlaying && currentSongIndex === 0) {
              togglePlay()
            } else {
              playSong(0)
            }
          }}
          className="bg-green-500 hover:bg-green-400 text-black font-bold p-3 rounded-full mb-6 flex items-center justify-center"
        >
          <Play className="h-6 w-6" />
        </button>
      </div>

      <div className="px-6 pb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-700 text-left text-sm text-zinc-400">
              <th className="pb-2 w-10">#</th>
              <th className="pb-2">Título</th>
              <th className="pb-2 hidden md:table-cell">Álbum</th>
              <th className="pb-2 text-right">
                <Clock className="h-4 w-4 inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={index}
                className={`hover:bg-zinc-700/30 group ${currentSongIndex === index ? "bg-zinc-700/50" : ""}`}
                onClick={() => playSong(index)}
              >
                <td className="py-3 text-zinc-400">{index + 1}</td>
                <td>
                  <div className="flex items-center">
                    <div>
                      <div className={`font-medium ${currentSongIndex === index ? "text-green-500" : ""}`}>
                        {song.title}
                      </div>
                      <div className="text-sm text-zinc-400">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell text-zinc-400">{song.album}</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Heart
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(song.id)
                      }}
                      className={`h-4 w-4 invisible group-hover:visible ${song.isLiked ? "text-green-500 fill-green-500 visible" : "text-zinc-400"}`}
                    />
                    <span className="text-zinc-400">{song.duration}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
