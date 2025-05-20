import { Carousel } from "./carousel"

export function PhotoGallery() {
  const photos = [
    {
      src: "/couple-beach-sunset.png",
      alt: "Casal na praia",
      caption: "Nossa primeira viagem juntos",
    },
    {
      src: "/couple-at-concert.png",
      alt: "Casal em um show",
      caption: "Show inesquecível",
    },
    {
      src: "/couple-mountain-hike.png",
      alt: "Casal fazendo trilha",
      caption: "Aventura nas montanhas",
    },
    {
      src: "/romantic-dinner.png",
      alt: "Jantar romântico",
      caption: "Celebração de 1 ano",
    },
    {
      src: "/couple-picnic-park.png",
      alt: "Piquenique no parque",
      caption: "Tarde de domingo",
    },
    {
      src: "/couple-cooking-kitchen.png",
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
