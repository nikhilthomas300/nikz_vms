"use client"

import { Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { NotificationCenter } from "@/components/ui/notification-center"
import { UserProfileMenu } from "@/components/ui/user-profile-menu"

interface TopbarProps {
  title: string
  subtitle?: string
  showSearch?: boolean
  onMenuClick?: () => void
}

export function Topbar({ title, subtitle, showSearch = true, onMenuClick }: TopbarProps) {
  return (
    <Card className="sticky top-0 z-10 rounded-none border-l-0 border-r-0 border-t-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm sm:text-base">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search visitors..."
                className="pl-8 w-48 lg:w-64"
              />
            </div>
          )}

          <NotificationCenter />

          <UserProfileMenu />
        </div>
      </div>
    </Card>
  )
}
