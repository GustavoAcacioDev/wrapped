"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import { AnimatedElement } from "./animated-element"

export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-900/40 to-black">
      <div className="container mx-auto text-center">
        <AnimatedElement type="fade-down" duration={0.7}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">2 Anos de Amor</h1>
        </AnimatedElement>

        <AnimatedElement type="fade-up" delay={0.2} duration={0.7}>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10">
            Celebrando nossa jornada juntos, uma playlist de momentos especiais
          </p>
        </AnimatedElement>

        <AnimatedElement type="zoom-in" delay={0.4} duration={0.7}>
          <div className="flex justify-center">
            <Link
              href="#player"
              className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors"
            >
              <Play className="h-5 w-5" />
              Ouvir Nossa Música
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
