"use client"

import React from "react"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type AnimationType = "fade-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out"

interface AnimatedElementProps {
  children: React.ReactNode
  type?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

export function AnimatedElement({
  children,
  type = "fade-up",
  delay = 0,
  duration = 0.5,
  className,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimatedElementProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin })

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        {
          "opacity-0": !isInView,
          "opacity-100": isInView,
          "translate-y-8": !isInView && type === "fade-up",
          "translate-y-0": isInView && type === "fade-up",
          "translate-y-[-2rem]": !isInView && type === "fade-down",
          "translate-y-0": isInView && type === "fade-down",
          "translate-x-[-2rem]": !isInView && type === "fade-left",
          "translate-x-0": isInView && type === "fade-left",
          "translate-x-8": !isInView && type === "fade-right",
          "translate-x-0": isInView && type === "fade-right",
          "scale-95": !isInView && type === "zoom-in",
          "scale-100": isInView && type === "zoom-in",
          "scale-105": !isInView && type === "zoom-out",
          "scale-100": isInView && type === "zoom-out",
        },
        className,
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function AnimatedGroup({
  children,
  type = "fade-up",
  stagger = 0.1,
  duration = 0.5,
  className,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimatedElementProps & { stagger?: number }) {
  const { ref, isInView } = useInView({ threshold, rootMargin })

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        return (
          <div
            className={cn("transition-all", {
              "opacity-0": !isInView,
              "opacity-100": isInView,
              "translate-y-8": !isInView && type === "fade-up",
              "translate-y-0": isInView && type === "fade-up",
              "translate-y-[-2rem]": !isInView && type === "fade-down",
              "translate-y-0": isInView && type === "fade-down",
              "translate-x-[-2rem]": !isInView && type === "fade-left",
              "translate-x-0": isInView && type === "fade-left",
              "translate-x-8": !isInView && type === "fade-right",
              "translate-x-0": isInView && type === "fade-right",
              "scale-95": !isInView && type === "zoom-in",
              "scale-100": isInView && type === "zoom-in",
              "scale-105": !isInView && type === "zoom-out",
              "scale-100": isInView && type === "zoom-out",
            })}
            style={{
              transitionDuration: `${duration}s`,
              transitionDelay: `${index * stagger}s`,
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
