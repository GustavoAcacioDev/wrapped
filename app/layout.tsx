import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MusicProvider } from "@/context/music-context"
import { FixedPlayer } from "@/components/fixed-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "2 Anos de Amor | Nossa História",
  description: "Celebrando 2 anos de namoro com uma playlist de momentos especiais",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MusicProvider>
            <div className="pb-24">{children}</div>
            <FixedPlayer />
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
