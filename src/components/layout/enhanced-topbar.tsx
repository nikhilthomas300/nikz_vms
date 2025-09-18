"use client"

import React, { useState } from "react"
import { Menu, Users, Shield, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NotificationCenter } from "@/components/ui/notification-center"
import { UserProfileMenu } from "@/components/ui/user-profile-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface EnhancedTopbarProps {
  title: string
  subtitle?: string
  onMenuClick?: () => void
  currentRole?: 'host' | 'visitor' | 'security' | 'admin' | 'kiosk' | 'employee'
  userRoles?: Array<'host' | 'visitor' | 'security' | 'admin' | 'employee'>
  onRoleSwitch?: (role: 'host' | 'visitor' | 'security' | 'admin' | 'employee') => void
  showClock?: boolean
}

const roleConfig = {
  host: { 
    icon: Users, 
    label: "Host Portal", 
    color: "text-blue-600", 
    bgColor: "bg-blue-50 dark:bg-blue-950" 
  },
  visitor: { 
    icon: Users, 
    label: "Visitor Portal", 
    color: "text-green-600", 
    bgColor: "bg-green-50 dark:bg-green-950" 
  },
  security: { 
    icon: Shield, 
    label: "Security Dashboard", 
    color: "text-red-600", 
    bgColor: "bg-red-50 dark:bg-red-950" 
  },
  admin: { 
    icon: Building, 
    label: "Admin Center", 
    color: "text-purple-600", 
    bgColor: "bg-purple-50 dark:bg-purple-950" 
  },
  employee: { 
    icon: Users, 
    label: "Employee Portal", 
    color: "text-indigo-600", 
    bgColor: "bg-indigo-50 dark:bg-indigo-950" 
  },
  kiosk: { 
    icon: Users, 
    label: "Kiosk", 
    color: "text-gray-600", 
    bgColor: "bg-gray-50 dark:bg-gray-950" 
  }
}

export function EnhancedTopbar({ 
  title, 
  subtitle, 
  onMenuClick,
  currentRole = 'host',
  userRoles = [],
  onRoleSwitch,
  showClock = false
}: EnhancedTopbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second if clock is shown
  useState(() => {
    if (showClock) {
      const interval = setInterval(() => setCurrentTime(new Date()), 1000)
      return () => clearInterval(interval)
    }
  })

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="sticky top-0 z-20 rounded-none border-l-0 border-r-0 border-t-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md border-border/40">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden shrink-0 h-9 w-9 p-0"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground truncate">
                  {title}
                </h1>
              </div>
              {subtitle && (
                <p className="text-muted-foreground text-sm sm:text-base truncate max-w-xs sm:max-w-md lg:max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
          {/* Digital Clock */}
          {showClock && (
            <motion.div 
              className="hidden md:flex flex-col items-end text-right px-3 py-2 rounded-lg bg-muted/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg font-mono font-bold text-primary leading-none">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(currentTime)}
              </div>
            </motion.div>
          )}

          {/* Role Switcher */}
          {userRoles.length > 1 && onRoleSwitch && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hidden sm:flex gap-2 h-10 px-4 border-border/50 hover:bg-muted/50"
                >
                  {React.createElement(roleConfig[currentRole].icon, { className: "h-4 w-4" })}
                  <span className="hidden lg:inline font-medium">Switch Role</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-2">
                <div className="px-3 py-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Switch Portal
                  </p>
                </div>
                <DropdownMenuSeparator />
                {userRoles.map((role) => {
                  const config = roleConfig[role]
                  return (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => onRoleSwitch(role)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer ${role === currentRole ? 'bg-accent/50' : ''}`}
                    >
                      {React.createElement(config.icon, { className: `h-4 w-4 ${config.color}` })}
                      <span className="font-medium">{config.label}</span>
                      {role === currentRole && (
                        <Badge variant="secondary" className="ml-auto text-xs px-2 py-0.5">
                          Current
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Notifications */}
          <div className="flex items-center gap-2">
            <NotificationCenter />

            {/* User Profile */}
            <UserProfileMenu />
          </div>
        </div>
      </div>
    </Card>
  )
}
