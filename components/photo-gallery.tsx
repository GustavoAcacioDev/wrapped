'use client'
import { useState } from "react"
import { Carousel } from "./carousel"

const photos = [
  {
    src: "/img/primeiro-date.png",
    alt: "Nosso primeiro date",
    caption: "Nosso primeiro date juntos no finado Harumi :( RIP nosso japônes favorito",
  },
  {
    src: "/img/casa.png",
    alt: "Nossa epoca ficantes hihihi",
    caption: "Eu amava muito nossas tardes juntos conversando que nem dois pombinhos apaixonados",
  },
  {
    src: "/img/namoro.png",
    alt: "ELA DISSE SIM!!!!!!",
    caption: "Dia em que me tornei o homem mais feliz do mundo",
  },
  {
    src: "/img/alianca.png",
    alt: "ALIANÇAMOS!!!",
    caption: "Dia que a gente foi comprar nossa aliança linda",
  },
  {
    src: "/img/coco-bambu.png",
    alt: "Primeiro date de aliança nova",
    caption: "Todo mundo comendo um camarão grande gostoso e eu nada",
  },
  {
    src: "/img/quadro.png",
    alt: "Casal Mais Lindo Do Planeta. by Michelangelo",
    caption: "Essa é uma das nossas fotos preferidas de todos os tempos",
  },
  {
    src: "/img/gato-de-botas.png",
    alt: "Gato e Gatinha de Botas",
    caption: "Por que os gatos não gostam de fazer compras online?\n Porque eles preferem gatálogos.",
  },
  {
    src: "/img/pinacoteca.png",
    alt: "Nós entregando muito cult (cunt) no museu",
    caption: "Fala serio, a gente é um casal muito inteligente cultos",
  },
  {
    src: "/img/praiou.png",
    alt: "Nossa primeira praia juntos",
    caption: "Muito demais isso, a gente começou a namorar, e fomos pra praia juntos!!!!!!! ISSO É INCRIVEL",
  },
  {
    src: "/img/aniversario.png",
    alt: "Niversario da minha momolada linda",
    caption: "Voce é tão linda vidinha, serio olha essa obra de arte, menina bonita do caramba, te amo!",
  },
  {
    src: "/img/show.png",
    alt: "ROCK!",
    caption: "Eu fiquei muito feliz de voce ter ido nesse show comigo, te amo muito minha lindinha",
  },
  {
    src: "/img/van-ghog.png",
    alt: "EXPOSIÇÃO DO VAN GHOG",
    caption: "Sério mesmo, é muita cultura envolvida. (Amo essa foto)",
  },
  {
    src: "/img/ano-novo.png",
    alt: "Nosso primeiro ano novo!!!!",
    caption: "As primeiras 7 ondinhas de 381920381902391902741 que vamos pular",
  },
  {
    src: "/img/zoo.png",
    alt: "RRRRAAAWWWRRRR! (Audio capitado diretamente da caverna do leão)",
    caption: "Foi tão gostosinho ir no zoologico com voce, a gente tem que fazer coisas assim mais vezes",
  },
  {
    src: "/img/restaurante.png",
    alt: "Restaurantou?",
    caption: "Dia em que pedimos uma refeição tamanho família para cada um",
  },
  {
    src: "/img/1-ano.png",
    alt: "Essa foto ficou muito foto de album de familia",
    caption: "1 aninho da gente juntos!!!! olha isso meu já tem 1 ano que essa foto foi tirada",
  },
  {
    src: "/img/1-ano-2.png",
    alt: "NÓS! E nada mais",
    caption: "Essa foto pra mim é mto perfeita",
  },
  {
    src: "/img/sitio.png",
    alt: "QUE FOTO FODA",
    caption: "Mais uma foto pro album da familia",
  },
  {
    src: "/img/praia-ano-novo.png",
    alt: "Foto antes de dar mta merda kkkkkkkk",
    caption: "Eu preciso aprender a tirar foto, olha essa postura que coisa feia",
  },
  {
    src: "/img/ano-novo-2025.png",
    alt: "Nós depois de fugir de todo o caos!",
    caption: "Eu amei muito essa noite minha vidinha",
  },
  {
    src: "/img/ano-novo-romantico.png",
    alt: "Fala sério, essa mesa ficou muito linda",
    caption: "",
  },
  {
    src: "/img/meu-aniversario.png",
    alt: "Meu niver!!!!",
    caption: "Po, a pizza de costela hmmmmm",
  },
  {
    src: "/img/ceret.png",
    alt: "Nós no ceret bem divos",
    caption: "Foi bem gostosinha essa tarde. Amei mucho",
  },
  {
    src: "/img/barzinho.png",
    alt: "Tentando aplicar um conceito de foto que n funcionou",
    caption: "Nossa foto mais recente bem lindudos",
  },
]

export function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Carousel 
        images={photos} 
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
      <div className="mt-8 grid grid-cols-6 gap-2">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-md cursor-pointer"
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              className={`w-full h-full object-cover hover:scale-110 transition-transform duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-zinc-900' 
                  : ''
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}