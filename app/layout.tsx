import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MusicProvider } from "@/context/music-context"
import { FixedPlayer } from "@/components/fixed-player"
import { JourneyProvider } from "@/context/journey-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "2 Anos de Amor | Nossa História",
  description: "Celebrando 2 anos de namoro com uma playlist de momentos especiais",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
          <JourneyProvider>
            <MusicProvider>
              <div className="pb-24">{children}</div>
              <FixedPlayer />
            </MusicProvider>
          </JourneyProvider>
      </body>
    </html>
  )
}
