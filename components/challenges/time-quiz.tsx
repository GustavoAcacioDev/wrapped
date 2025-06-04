"use client"

import { useState } from "react"
import { Check, X, Trophy } from "lucide-react"
import { useJourney } from "@/context/journey-context"
import { AnimatedElement } from "../animated-element"

// Função utilitária para concatenar classes CSS condicionalmente
function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ")
}

interface Question {
    id: number
    question: string
    options: string[]
    correct: number
}

const questions: Question[] = [
    {
        id: 1,
        question: "Em que mês começamos a namorar?",
        options: ["Abril 2023", "Maio 2023", "Junho 2023", "Julho 2023"],
        correct: 2,
    },
    {
        id: 2,
        question: "Qual foi o nosso primeiro date?",
        options: ["Japones bem deli", "Você ir me assistir jogar futebol", "Cinema"],
        correct: 0,
    },
    {
        id: 3,
        question: "Qual a coisa que a gente mais gosta de ver?",
        options: ["Tiktok de restaurante", "Reels", "Diva Depressão", "Jogo do corinthians"],
        correct: 2,
    },
    {
        id: 4,
        question: "O que eu te dei de presente quando te pedi em namoro?",
        options: ["Cartinha", "Cartinha e colar", "Cartinha e girassol", "Aliança"],
        correct: 2,
    },
]

export function TimeQuiz() {
    const { completeStep, isStepCompleted, isStepUnlocked } = useJourney()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [isAnswered, setIsAnswered] = useState(false)

    const isCompleted = isStepCompleted("time-quiz")
    const isUnlocked = isStepUnlocked("time-quiz")

    // Estados derivados para melhor organização
    const currentQuestionData = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1
    const minRequiredScore = 2

    // Função para resetar o quiz
    const resetQuiz = () => {
        setCurrentQuestion(0)
        setCorrectAnswers(0)
        setShowResult(false)
        setSelectedAnswer(null)
        setIsAnswered(false)
    }

    // Função para calcular o score final
    const calculateFinalScore = () => {
        const isCurrentAnswerCorrect = selectedAnswer === currentQuestionData.correct
        return correctAnswers + (isCurrentAnswerCorrect ? 1 : 0)
    }

    if (!isUnlocked) {
        return (
            <div className="text-center py-8 bg-zinc-800/50 rounded-lg">
                <div className="text-zinc-500 mb-4">🔒</div>
                <h3 className="text-xl font-bold text-zinc-500 mb-2">Seção Bloqueada</h3>
                <p className="text-zinc-400">Complete o desafio anterior para desbloquear</p>
            </div>
        )
    }

    if (isCompleted) {
        return (
            <div className="text-center py-8">
                <div className="text-green-500 mb-4">
                    <Trophy className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-2">Quiz Concluído!</h3>
                <p className="text-zinc-300">Você conhece bem nossa história!</p>
            </div>
        )
    }

    const handleAnswerSelect = (answerIndex: number) => {
        if (isAnswered) return

        setSelectedAnswer(answerIndex)
        setIsAnswered(true)

        const isCorrect = answerIndex === currentQuestionData.correct
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1)
        }

        setTimeout(() => {
            if (!isLastQuestion) {
                // Próxima pergunta
                setCurrentQuestion((prev) => prev + 1)
                setSelectedAnswer(null)
                setIsAnswered(false)
            } else {
                // Fim do quiz
                setShowResult(true)
                const finalScore = correctAnswers + (isCorrect ? 1 : 0)
                if (finalScore >= minRequiredScore) {
                    setTimeout(() => completeStep("time-quiz"), 1000)
                }
            }
        }, 1500)
    }

    if (showResult) {
        const finalScore = calculateFinalScore()
        const passed = finalScore >= minRequiredScore

        return (
            <AnimatedElement type="zoom-in">
                <div className="text-center py-8 bg-zinc-900/50 rounded-lg">
                    <div className={cn("mb-4", passed ? "text-green-500" : "text-yellow-500")}>
                        {passed ? (
                            <Trophy className="h-12 w-12 mx-auto" />
                        ) : (
                            <span className="text-4xl">🤔</span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                        {passed ? "Parabéns!" : "Quase lá!"}
                    </h3>
                    <p className="text-zinc-300 mb-4">
                        Você acertou {finalScore} de {questions.length} perguntas
                    </p>
                    {!passed && (
                        <button
                            onClick={resetQuiz}
                            className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-6 rounded-full transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    )}
                </div>
            </AnimatedElement>
        )
    }

    // Função para determinar o estilo do botão de resposta
    const getAnswerButtonStyle = (optionIndex: number) => {
        const baseClasses = "w-full p-4 text-left rounded-lg border-2 transition-all"

        if (!isAnswered) {
            return cn(
                baseClasses,
                "border-zinc-600 bg-zinc-800 hover:border-green-500 hover:bg-green-500/10"
            )
        }

        // Estado após responder
        if (optionIndex === currentQuestionData.correct) {
            return cn(baseClasses, "border-green-500 bg-green-500/20 text-green-500")
        }

        if (optionIndex === selectedAnswer) {
            return cn(baseClasses, "border-red-500 bg-red-500/20 text-red-500")
        }

        return cn(baseClasses, "border-zinc-600 bg-zinc-800 text-zinc-400")
    }

    return (
        <AnimatedElement type="fade-up">
            <div className="bg-zinc-900/50 rounded-lg p-6">
                {/* Header com progresso */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-zinc-400">
                            Pergunta {currentQuestion + 1} de {questions.length}
                        </span>
                        <span className="text-sm text-green-500">
                            Acertos: {correctAnswers}
                        </span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`
                            }}
                        />
                    </div>
                </div>

                {/* Pergunta */}
                <h3 className="text-xl font-bold mb-6">{currentQuestionData.question}</h3>

                {/* Opções de resposta */}
                <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={getAnswerButtonStyle(index)}
                            disabled={isAnswered}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {isAnswered && index === currentQuestionData.correct && (
                                    <Check className="h-5 w-5" />
                                )}
                                {isAnswered &&
                                    index === selectedAnswer &&
                                    index !== currentQuestionData.correct && (
                                        <X className="h-5 w-5" />
                                    )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </AnimatedElement>
    )
}