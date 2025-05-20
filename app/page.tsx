import { Heart } from "lucide-react"
import { MusicPlayer } from "@/components/music-player"
import { Timeline } from "@/components/timeline"
import { PhotoGallery } from "@/components/photo-gallery"
import { Playlist } from "@/components/playlist"
import { Header } from "@/components/header"
import { TimeCounter } from "@/components/time-counter"
import { HeroSection } from "@/components/hero-section"
import { AboutUsSection } from "@/components/about-us-section"
import { AnimatedElement } from "@/components/animated-element"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Time Counter Section */}
        <TimeCounter />

        {/* Music Player Section */}
        <section id="player" className="py-16 px-4">
          <div className="container mx-auto">
            <AnimatedElement type="fade-down">
              <h2 className="text-3xl font-bold mb-10 text-center">Nossa Música</h2>
            </AnimatedElement>
            <AnimatedElement type="fade-up" delay={0.2}>
              <MusicPlayer />
            </AnimatedElement>
          </div>
        </section>

        {/* Nossa História Section */}
        <section id="nossa-historia" className="py-16 px-4 bg-zinc-900/50">
          <div className="container mx-auto">
            <AnimatedElement type="fade-down">
              <h2 className="text-3xl font-bold mb-10 text-center">Nossa História</h2>
            </AnimatedElement>
            <Timeline />
          </div>
        </section>

        {/* Sobre Nós Section */}
        <AboutUsSection />

        {/* Momentos Especiais Section */}
        <section id="momentos" className="py-16 px-4 bg-zinc-900/50">
          <div className="container mx-auto">
            <AnimatedElement type="fade-down">
              <h2 className="text-3xl font-bold mb-10 text-center">Momentos Especiais</h2>
            </AnimatedElement>
            <AnimatedElement type="fade-up" delay={0.2}>
              <PhotoGallery />
            </AnimatedElement>
          </div>
        </section>

        {/* Playlist Section */}
        <section id="playlist" className="py-16 px-4">
          <div className="container mx-auto">
            <AnimatedElement type="fade-down">
              <h2 className="text-3xl font-bold mb-10 text-center">Nossa Playlist</h2>
            </AnimatedElement>
            <AnimatedElement type="fade-up" delay={0.2}>
              <Playlist />
            </AnimatedElement>
          </div>
        </section>

        {/* Contador Section */}
        <section className="py-16 px-4 bg-green-900/30">
          <div className="container mx-auto text-center">
            <AnimatedElement type="fade-down">
              <h2 className="text-3xl font-bold mb-6">Celebrando</h2>
            </AnimatedElement>
            <AnimatedElement type="zoom-in" delay={0.2}>
              <div className="text-8xl font-bold text-green-500 mb-6">2 Anos</div>
            </AnimatedElement>
            <AnimatedElement type="fade-up" delay={0.4}>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                730 dias de amor, risadas, aventuras e crescimento juntos.
                <br />E isso é apenas o começo da nossa história.
              </p>
            </AnimatedElement>
          </div>
        </section>
      </main>

      <footer className="bg-black py-10 px-4 border-t border-zinc-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-green-500" />
              <span className="text-lg font-bold">NossoSpotify</span>
            </div>
            <p className="text-zinc-400 text-sm">
              Criado com ❤️ para celebrar 2 anos de amor | {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
