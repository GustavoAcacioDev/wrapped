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
                src="/img/sitio.png"
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
              Nos conhecemos em uma festa de amigos em comum. Você com uma trancinha toda toda, já te achei tão linda naquela noite (Só aquela camisa que nada a ve). Mal sabia que ia ter a honra de passar a minha vida inteira ao seu lado.
            </p>
            <h3 className="text-2xl font-bold text-green-500">O Que Nos Une</h3>
            <p className="text-zinc-300">
              Além do nosso amor, amamos passar os dias juntos, ouvir funk enquanto dirijo kkkkk, descobrir restaurantes novos. Basicamente fazer qualquer coisa juntos, até porque a coisa mais chata, se torna prazerosa do seu lado!
            </p>
            <h3 className="text-2xl font-bold text-green-500">Nosso Futuro</h3>
            <p className="text-zinc-300">
              Tenho certeza que nosso futuro vai ser incrivel. Conhecer o mundo do seu lado é o meu maior sonho! Já imaginou daqui 20 anos? Eu, você, a Analua e a Alcione, todos no sofá assistindo enrolados. Fala sério, PERFEIÇÃO!
            </p>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  )
}
