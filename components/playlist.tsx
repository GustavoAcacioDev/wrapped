"use client"

import { Play, Clock, Heart, Music, Mic, MessageCircle } from "lucide-react"
import { useMusic } from "@/context/music-context"
import { Tabs, TabContent } from "./tabs"

function PlaylistTable({ songs, title, description }: { songs: any[]; title: string; description: string }) {
  const { currentSongIndex, isPlaying, playSong, togglePlay, toggleLike, songs: allSongs } = useMusic()

  return (
    <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-zinc-400">Playlist</div>
            <h3 className="text-4xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const firstSongIndex = allSongs.findIndex((song) => song.id === songs[0]?.id)
            if (isPlaying && currentSongIndex === firstSongIndex) {
              togglePlay()
            } else {
              playSong(firstSongIndex)
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
            {songs.map((song, index) => {
              const globalIndex = allSongs.findIndex((s) => s.id === song.id)
              const isCurrentSong = currentSongIndex === globalIndex

              return (
                <tr
                  key={song.id}
                  className={`hover:bg-zinc-700/30 group cursor-pointer ${isCurrentSong ? "bg-zinc-700/50" : ""}`}
                  onClick={() => playSong(globalIndex)}
                >
                  <td className="py-3 text-zinc-400">{index + 1}</td>
                  <td>
                    <div className="flex items-center">
                      <div>
                        <div className={`font-medium ${isCurrentSong ? "text-green-500" : ""}`}>
                          {song.title}
                          {song.type === "custom" && (
                            <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                              Personalizada
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-zinc-400">{song.artist}</div>
                        {song.customNote && (
                          <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {song.customNote}
                          </div>
                        )}
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Playlist() {
  const { getOriginalSongs, getCustomSongs } = useMusic()

  const originalSongs = getOriginalSongs()
  const customSongs = getCustomSongs()

  const tabs = [
    {
      id: "original",
      label: "Versões Originais",
      icon: <Music className="h-4 w-4" />,
    },
    {
      id: "custom",
      label: "Feitas por Mim",
      icon: <Mic className="h-4 w-4" />,
    },
  ]

  return (
    <Tabs tabs={tabs} defaultTab="original">
      <TabContent value="original">
        <PlaylistTable
          songs={originalSongs}
          title="Nossas Músicas Favoritas"
          description={`${originalSongs.length} músicas que marcaram nossa história`}
        />
      </TabContent>

      <TabContent value="custom">
        <PlaylistTable
          songs={customSongs}
          title="Criações Especiais"
          description={`${customSongs.length} músicas feitas com amor especialmente para você`}
        />
      </TabContent>
    </Tabs>
  )
}
