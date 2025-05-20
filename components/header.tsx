"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#nossa-historia", label: "Nossa História" },
  { href: "#sobre-nos", label: "Sobre Nós" },
  { href: "#momentos", label: "Momentos" },
  { href: "#playlist", label: "Playlist" },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Função para rolagem suave
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      // Adiciona uma classe para a animação
      element.classList.add("section-highlight")

      // Remove a classe após a animação
      setTimeout(() => {
        element.classList.remove("section-highlight")
      }, 1500)

      // Rolagem suave
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Fecha o menu mobile após clicar
      setMobileMenuOpen(false)
    }
  }

  // Detecta a seção ativa durante a rolagem
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // offset para melhor detecção

      // Verifica cada seção para ver qual está visível
      for (const item of navItems) {
        const targetId = item.href.replace("#", "")
        const element = document.getElementById(targetId)

        if (element) {
          const { offsetTop, offsetHeight } = element

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.href)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Checa a posição inicial

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm py-4 px-4 border-b border-zinc-800">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">NossoSpotify</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="relative flex gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "transition-colors duration-300 py-1 px-2 relative",
                    activeSection === item.href ? "text-green-500 font-medium" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 animate-slide-in-right" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Botão do Menu Mobile */}
          <button
            className="md:hidden text-zinc-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-zinc-900 rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "transition-colors duration-300 py-2 px-3 rounded-md",
                    activeSection === item.href
                      ? "bg-green-500/20 text-green-500 font-medium"
                      : "text-zinc-300 hover:bg-zinc-800",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
