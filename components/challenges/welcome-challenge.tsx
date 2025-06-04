"use client"
import { useState } from "react"
import { Heart, Sparkles } from "lucide-react"
import { useJourney } from "@/context/journey-context"
import { AnimatedElement } from "../animated-element"

// Função utilitária para concatenar classes CSS condicionalmente
function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ")
}

export function WelcomeChallenge() {
    const { completeStep, isStepCompleted } = useJourney()
    const [clicks, setClicks] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    
    const isCompleted = isStepCompleted("welcome")
    
    const handleHeartClick = () => {
        if (isCompleted) return
        
        setClicks((prev) => prev + 1)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
        
        if (clicks >= 4) {
            setTimeout(() => {
                completeStep("welcome")
            }, 500)
        }
    }
    
    if (isCompleted) {
        return (
            <div className="text-center py-8">
                <div className="text-green-500 mb-4">
                    <Sparkles className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2">Desafio Concluído!</h3>
                <p className="text-zinc-300">Você desbloqueou a próxima etapa da jornada!</p>
            </div>
        )
    }
    
    return (
        <AnimatedElement type="fade-up">
            <div className="text-center py-8 bg-zinc-900/50 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Bem-vindos à Nossa Jornada!</h3>
                <p className="text-zinc-300 mb-6">
                    Clique no coração {5 - clicks} vezes para começar nossa aventura
                </p>
                
                <button
                    onClick={handleHeartClick}
                    className={cn(
                        "relative mx-auto block transition-all duration-300",
                        isAnimating ? "scale-125" : "scale-100 hover:scale-110"
                    )}
                >
                    <Heart
                        className={cn(
                            "h-16 w-16 transition-colors",
                            clicks >= 1 ? "text-red-500 fill-red-500" : "text-zinc-400"
                        )}
                    />
                    {isAnimating && (
                        <div className="absolute inset-0 animate-ping">
                            <Heart className="h-16 w-16 text-red-500 opacity-75" />
                        </div>
                    )}
                </button>
                
                <div className="flex justify-center mt-4 space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                index < clicks ? "bg-green-500" : "bg-zinc-600"
                            )}
                        />
                    ))}
                </div>
            </div>
        </AnimatedElement>
    )
}