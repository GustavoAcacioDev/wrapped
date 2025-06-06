"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

export interface Song {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  durationInSeconds: number
  isLiked: boolean
  audioSrc: string
  type: "original" | "custom"
  customNote?: string
}

interface MusicContextType {
  songs: Song[]
  currentSongIndex: number
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  playSong: (index: number) => void
  togglePlay: () => void
  nextSong: () => void
  prevSong: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  toggleLike: (id: number) => void
  getOriginalSongs: () => Song[]
  getCustomSongs: () => Song[]
}

const defaultSongs: Song[] = [
  {
    id: 1,
    title: "Outra Vida",
    artist: "Armandinho",
    album: "2 anos de nós",
    duration: "4:47",
    durationInSeconds: 287,
    isLiked: true,
    audioSrc: "/songs/outra-vida.mp3",
    type: "original",
  },
  {
    id: 1.1,
    title: "Outra Vida",
    artist: "Gustavinho",
    album: "2 anos de nós",
    duration: "2:40",
    durationInSeconds: 160,
    isLiked: true,
    audioSrc: "/songs/outra-vida-eu.mp3",
    type: "custom",
  },
  {
    id: 2,
    title: "Analua",
    artist: "Armandinho",
    album: "2 anos de nós",
    duration: "4:33",
    durationInSeconds: 273,
    isLiked: true,
    audioSrc: "/songs/analua.mp3",
    type: "original",
  },
  {
    id: 3,
    title: "Cor de Marte",
    artist: "ANAVITORIA",
    album: "2 anos de nós",
    duration: "3:12",
    durationInSeconds: 192,
    isLiked: true,
    audioSrc: "/songs/cor-de-marte.mp3",
    type: "original",
  },
  {
    id: 3.1,
    title: "Cor de Marte",
    artist: "GUSTAVITORIA",
    album: "2 anos de nós",
    duration: "2:53",
    durationInSeconds: 173,
    isLiked: true,
    audioSrc: "/songs/cor-de-marte-eu.mp3",
    type: "custom",
  },
  {
    id: 4,
    title: "Um Amor Puro",
    artist: "Djavan",
    album: "2 anos de nós",
    duration: "5:28",
    durationInSeconds: 328,
    isLiked: false,
    audioSrc: "/songs/amor-puro.mp3", 
    type: "original",
  },
  {
    id: 5,
    title: "Exagerado",
    artist: "Cazuza",
    album: "2 anos de nós",
    duration: "3:42",
    durationInSeconds: 222,
    isLiked: true,
    audioSrc: "/songs/exagerado.mp3", 
    type: "original",
  },
  {
    id: 5.1,
    title: "Exagerado",
    artist: "Guzuza",
    album: "2 anos de nós",
    duration: "1:52",
    durationInSeconds: 112,
    isLiked: true,
    audioSrc: "/songs/exagerado-eu.mp3", 
    type: "custom",
  },
  {
    id: 6,
    title: "Mimar Você",
    artist: "Caetano Veloso",
    album: "2 anos de nós",
    duration: "3:06",
    durationInSeconds: 186,
    isLiked: false,
    audioSrc: "/songs/mimar-vc.mp3",
    type: "original",
  },
  {
    id: 6.1,
    title: "Mimar Você",
    artist: "Gustavo Veloso",
    album: "2 anos de nós",
    duration: "1:00",
    durationInSeconds: 60,
    isLiked: false,
    audioSrc: "/songs/mimar-vc-eu.mp3",
    type: "custom",
  },
  {
    id: 7,
    title: "Partilhar",
    artist: "Rubel",
    album: "2 anos de nós",
    duration: "5:37",
    durationInSeconds: 337,
    isLiked: true,
    audioSrc: "/songs/partilhar.mp3", 
    type: "original",
  }, 
  {
    id: 7.1,
    title: "Partilhar",
    artist: "Gustavel",
    album: "2 anos de nós",
    duration: "1:27",
    durationInSeconds: 87,
    isLiked: true,
    audioSrc: "/songs/partilhar-eu.mp3", 
    type: "custom",
  }, 
]

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(defaultSongs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Inicializar o elemento de áudio
  useEffect(() => {
    audioRef.current = new Audio(songs[currentSongIndex].audioSrc)
    audioRef.current.volume = volume / 100

    const handleEnded = () => {
      nextSong()
    }

    audioRef.current.addEventListener("ended", handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("ended", handleEnded)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Atualizar o áudio quando a música muda
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = songs[currentSongIndex].audioSrc
      setDuration(songs[currentSongIndex].durationInSeconds)
      setCurrentTime(0)

      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Erro ao reproduzir áudio:", e)
        })
      }
    }
  }, [currentSongIndex, songs])

  // Atualizar o volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Atualizar o tempo atual
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime)
        }
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const playSong = (index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play().catch((e) => {
        console.error("Erro ao reproduzir áudio:", e)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length)
  }

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const toggleLike = (id: number) => {
    setSongs((prevSongs) => prevSongs.map((song) => (song.id === id ? { ...song, isLiked: !song.isLiked } : song)))
  }

  const getOriginalSongs = () => {
    return songs.filter((song) => song.type === "original")
  }

  const getCustomSongs = () => {
    return songs.filter((song) => song.type === "custom")
  }

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentSongIndex,
        isPlaying,
        volume,
        currentTime,
        duration,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        setVolume,
        seekTo,
        toggleLike,
        getOriginalSongs,
        getCustomSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
