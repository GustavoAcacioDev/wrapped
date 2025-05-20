"use client"

import Image from "next/image"
import { AnimatedElement, AnimatedGroup } from "./animated-element"

export function AboutUsSection() {
  return (
    <section id="sobre-nos" className="py-16 px-4">
      <div className="container mx-auto">
        <AnimatedElement type="fade-down">
          <h2 className="text-3xl font-bold mb-10 text-center">Sobre Nós</h2>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <AnimatedElement type="fade-right" duration={0.7}>
            <div>
              <Image
                src="/happy-couple-portrait.png"
                alt="Foto do casal"
                width={400}
                height={400}
                className="rounded-lg mx-auto"
              />
            </div>
          </AnimatedElement>

          <AnimatedGroup type="fade-left" stagger={0.2} duration={0.7} className="space-y-4">
            <h3 className="text-2xl font-bold text-green-500">Como Tudo Começou</h3>
            <p className="text-zinc-300">
              Nos conhecemos em uma festa de amigos em comum. Desde o primeiro momento, houve uma conexão especial entre
              nós. Conversamos a noite toda sobre música, filmes e sonhos para o futuro.
            </p>
            <h3 className="text-2xl font-bold text-green-500">O Que Nos Une</h3>
            <p className="text-zinc-300">
              Além do amor que sentimos um pelo outro, compartilhamos a paixão por música, viagens e comida. Nossos
              finais de semana geralmente envolvem descobrir novos restaurantes ou planejar nossa próxima aventura.
            </p>
            <h3 className="text-2xl font-bold text-green-500">Nosso Futuro</h3>
            <p className="text-zinc-300">
              Juntos, sonhamos em viajar pelo mundo, construir um lar acolhedor e continuar criando memórias que durarão
              para sempre. Cada dia é uma nova oportunidade para fortalecer ainda mais nosso amor.
            </p>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  )
}
