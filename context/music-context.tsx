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
}

const defaultSongs: Song[] = [
  {
    id: 1,
    title: "Nossa Música",
    artist: "Artista Especial",
    album: "Momentos",
    duration: "3:30",
    durationInSeconds: 210,
    isLiked: true,
    audioSrc: "/music/nossa-musica.mp3",
  },
  {
    id: 2,
    title: "Primeiro Encontro",
    artist: "Cantor Romântico",
    album: "Amor à Primeira Vista",
    duration: "4:15",
    durationInSeconds: 255,
    isLiked: true,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
  },
  {
    id: 3,
    title: "Noite Estrelada",
    artist: "Banda Melodia",
    album: "Sob o Céu",
    duration: "3:45",
    durationInSeconds: 225,
    isLiked: true,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
  },
  {
    id: 4,
    title: "Viagem de Verão",
    artist: "Os Viajantes",
    album: "Destinos",
    duration: "3:20",
    durationInSeconds: 200,
    isLiked: false,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
  },
  {
    id: 5,
    title: "Jantar à Luz de Velas",
    artist: "Trio Romântico",
    album: "Momentos Especiais",
    duration: "4:05",
    durationInSeconds: 245,
    isLiked: true,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
  },
  {
    id: 6,
    title: "Dança Comigo",
    artist: "DJ Amor",
    album: "Batidas do Coração",
    duration: "3:55",
    durationInSeconds: 235,
    isLiked: false,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
  },
  {
    id: 7,
    title: "Para Sempre Nós",
    artist: "Artista Especial",
    album: "Eternidade",
    duration: "5:10",
    durationInSeconds: 310,
    isLiked: true,
    audioSrc: "/music/nossa-musica.mp3", // Usando a mesma música para demonstração
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
