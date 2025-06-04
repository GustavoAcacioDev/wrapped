"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface JourneyStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isUnlocked: boolean
  type: "quiz" | "memory" | "interaction" | "music" | "photo" | "message"
}

interface JourneyContextType {
  steps: JourneyStep[]
  currentStep: number
  totalSteps: number
  completeStep: (stepId: string) => void
  getStepProgress: () => number
  isStepUnlocked: (stepId: string) => boolean
  isStepCompleted: (stepId: string) => boolean
}

const initialSteps: JourneyStep[] = [
  {
    id: "welcome",
    title: "Bem-vindos à Nossa Jornada",
    description: "Clique no coração para começar nossa aventura",
    isCompleted: false,
    isUnlocked: true,
    type: "interaction",
  },
  {
    id: "time-quiz",
    title: "Quiz do Tempo",
    description: "Responda perguntas sobre nosso relacionamento",
    isCompleted: false,
    isUnlocked: false,
    type: "quiz",
  },
  {
    id: "music-challenge",
    title: "Desafio Musical",
    description: "Encontre nossa música especial",
    isCompleted: false,
    isUnlocked: false,
    type: "music",
  },
  {
    id: "memory-game",
    title: "Jogo da Memória",
    description: "Combine os momentos especiais",
    isCompleted: false,
    isUnlocked: false,
    type: "memory",
  },
  {
    id: "photo-story",
    title: "História em Fotos",
    description: "Organize nossa timeline",
    isCompleted: false,
    isUnlocked: false,
    type: "photo",
  },
  {
    id: "love-message",
    title: "Mensagem de Amor",
    description: "Deixe uma mensagem especial",
    isCompleted: false,
    isUnlocked: false,
    type: "message",
  },
]

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [steps, setSteps] = useState<JourneyStep[]>(initialSteps)
  const [currentStep, setCurrentStep] = useState(0)

  const completeStep = (stepId: string) => {
    setSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step, index) => {
        if (step.id === stepId) {
          return { ...step, isCompleted: true }
        }
        // Desbloquear próximo passo
        if (index === prevSteps.findIndex((s) => s.id === stepId) + 1) {
          return { ...step, isUnlocked: true }
        }
        return step
      })

      // Atualizar passo atual
      const completedIndex = updatedSteps.findIndex((s) => s.id === stepId)
      if (completedIndex !== -1 && completedIndex >= currentStep) {
        setCurrentStep(completedIndex + 1)
      }

      return updatedSteps
    })
  }

  const getStepProgress = () => {
    const completedSteps = steps.filter((step) => step.isCompleted).length
    return (completedSteps / steps.length) * 100
  }

  const isStepUnlocked = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId)
    return step?.isUnlocked || false
  }

  const isStepCompleted = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId)
    return step?.isCompleted || false
  }

  // Salvar progresso no localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("journey-progress")
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setSteps(parsed.steps)
      setCurrentStep(parsed.currentStep)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("journey-progress", JSON.stringify({ steps, currentStep }))
  }, [steps, currentStep])

  return (
    <JourneyContext.Provider
      value={{
        steps,
        currentStep,
        totalSteps: steps.length,
        completeStep,
        getStepProgress,
        isStepUnlocked,
        isStepCompleted,
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (context === undefined) {
    throw new Error("useJourney must be used within a JourneyProvider")
  }
  return context
}
