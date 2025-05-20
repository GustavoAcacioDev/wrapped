"use client"

import { CalendarDays, Heart, Music, Map, Gift, Star } from "lucide-react"
import { AnimatedGroup } from "./animated-element"

export function Timeline() {
  const events = [
    {
      date: "Maio 2023",
      title: "Primeiro Encontro",
      description: "Nos conhecemos em uma festa de amigos em comum e trocamos contatos.",
      icon: <Heart className="h-5 w-5 text-green-500" />,
    },
    {
      date: "Junho 2023",
      title: "Início do Namoro",
      description: "Oficializamos nosso relacionamento após um mês de encontros incríveis.",
      icon: <CalendarDays className="h-5 w-5 text-green-500" />,
    },
    {
      date: "Agosto 2023",
      title: "Primeiro Show Juntos",
      description: "Fomos ao nosso primeiro show juntos e descobrimos mais músicas em comum.",
      icon: <Music className="h-5 w-5 text-green-500" />,
    },
    {
      date: "Dezembro 2023",
      title: "Primeira Viagem",
      description: "Nossa primeira viagem juntos para a praia, onde criamos memórias inesquecíveis.",
      icon: <Map className="h-5 w-5 text-green-500" />,
    },
    {
      date: "Maio 2024",
      title: "Aniversário de 1 Ano",
      description: "Celebramos nosso primeiro ano juntos com um jantar especial.",
      icon: <Gift className="h-5 w-5 text-green-500" />,
    },
    {
      date: "Maio 2025",
      title: "Aniversário de 2 Anos",
      description: "Chegamos aos 2 anos de relacionamento, mais apaixonados do que nunca!",
      icon: <Star className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-500/30"></div>

        {/* Eventos */}
        <AnimatedGroup type="fade-up" stagger={0.15} className="space-y-12">
          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Círculo no centro */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-800 border-2 border-green-500 flex items-center justify-center z-10">
                {event.icon}
              </div>

              {/* Conteúdo */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <div className="bg-zinc-800/80 p-4 rounded-lg shadow-lg">
                  <div className="text-green-500 font-semibold mb-1">{event.date}</div>
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-zinc-300 text-sm">{event.description}</p>
                </div>
              </div>

              {/* Espaço do outro lado */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </div>
  )
}
