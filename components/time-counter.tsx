"use client"

import { useState, useEffect } from "react"
import { AnimatedElement, AnimatedGroup } from "./animated-element"

export function TimeCounter() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Data de início do relacionamento (ajuste para a data real)
    const startDate = new Date("2023-05-20T00:00:00")

    const calculateTime = () => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      const seconds = Math.floor(difference / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      setTimeElapsed({
        days,
        hours,
        minutes,
        seconds,
      })
    }

    // Calcular imediatamente
    calculateTime()

    // Atualizar a cada segundo
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto text-center">
        <AnimatedElement type="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">Celebrando 2 Anos</h2>
        </AnimatedElement>

        <AnimatedElement type="fade-up" delay={0.2}>
          <p className="text-xl text-white mb-8">Estamos juntos há:</p>
        </AnimatedElement>

        <AnimatedGroup
          type="zoom-in"
          stagger={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-3xl lg:text-5xl font-bold text-green-500 mb-2 tabular-nums">
              {timeElapsed.days}
            </span>
            <span className="text-white text-lg">Dias</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-3xl lg:text-5xl font-bold text-green-500 mb-2 tabular-nums">
              {timeElapsed.hours}
            </span>
            <span className="text-white text-lg">Horas</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-5xl font-bold text-green-500 mb-2 tabular-nums">
              {timeElapsed.minutes}
            </span>
            <span className="text-white text-lg">Minutos</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl lg:text-5xl font-bold text-green-500 mb-2 tabular-nums">
              {timeElapsed.seconds}
            </span>
            <span className="text-white text-lg">Segundos</span>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  )
}
