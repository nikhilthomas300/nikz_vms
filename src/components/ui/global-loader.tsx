"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Building } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlobalLoaderProps {
  isLoading: boolean
  text?: string
  className?: string
}

export function GlobalLoader({ isLoading, text = "Loading...", className }: GlobalLoaderProps) {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <Building className="h-8 w-8 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg font-medium text-foreground mb-2">{text}</p>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-blue-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
