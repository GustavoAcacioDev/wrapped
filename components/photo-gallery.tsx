import { Carousel } from "./carousel"

export function PhotoGallery() {
  const photos = [
    {
      src: "/img/primeiro-date.png",
      alt: "Nosso primeiro date",
      caption: "Nosso primeiro date juntos no finado Harumi",
    },
    {
      src: "/img/alianca.png",
      alt: "Casal em um show",
      caption: "Show inesquecível",
    },
    {
      src: "/img/1-ano.png",
      alt: "Casal fazendo trilha",
      caption: "Aventura nas montanhas",
    },
    {
      src: "/img/1-ano-2.png",
      alt: "Jantar romântico",
      caption: "Celebração de 1 ano",
    },
    {
      src: "/img/ano-novo.png",
      alt: "Piquenique no parque",
      caption: "Tarde de domingo",
    },
    {
      src: "/img/casa.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/coco-bambu.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/festa-junina.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/gato-de-botas.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/namoro.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/pinacoteca.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/praiou.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/primeiro-date.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/quadro.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/restaurante.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/show.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/van-ghog.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
    {
      src: "/img/zoo.png",
      alt: "Cozinhando juntos",
      caption: "Nossa primeira receita",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Carousel images={photos} />

      <div className="mt-8 grid grid-cols-6 gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-md">
            <img
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
