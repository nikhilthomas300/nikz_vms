"use client"

import { motion } from "framer-motion"
import { Building, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8",
  xl: "w-12 h-12"
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg", 
  xl: "text-xl"
}

export function LoadingSpinner({ 
  size = "md", 
  className, 
  text = "Loading...",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={cn(sizeClasses[size], "text-blue-600 dark:text-blue-400")}
        >
          <Loader2 className="w-full h-full" />
        </motion.div>
        
        {/* Pulsing background circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute inset-0 rounded-full bg-blue-500/20",
            sizeClasses[size]
          )}
        />
      </div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "text-muted-foreground font-medium",
            textSizeClasses[size]
          )}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Building className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VMS
              </h1>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 text-blue-600 dark:text-blue-400"
            >
              <Loader2 className="w-full h-full" />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
            
            <p className="text-lg font-medium text-muted-foreground">
              Please wait...
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return spinner
}

// Skeleton loading components for different content types
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-muted rounded-lg p-6">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
          </div>
          <div className="h-10 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted-foreground/20 rounded" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="h-4 bg-muted-foreground/20 rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}
