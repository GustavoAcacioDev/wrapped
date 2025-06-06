"use client"

import React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onTabChange?: (tabId: string) => void
  children: React.ReactNode
}

interface TabContentProps {
  value: string
  children: React.ReactNode
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (tab: string) => void
} | null>(null)

export function Tabs({ tabs, defaultTab, onTabChange, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="w-full">
        <div className="flex space-x-1 bg-zinc-800/50 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-green-500 text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/50",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabContent({ value, children }: TabContentProps) {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabContent must be used within Tabs")
  }

  const { activeTab } = context

  if (activeTab !== value) {
    return null
  }

  return <div className="animate-in fade-in-50 duration-200">{children}</div>
}
