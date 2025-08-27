"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building,
  Calendar,
  ChartLine,
  Shield,
  Users,
  UserCheck,
  Settings,
  LogOut,
  Monitor,
  AlertTriangle,
  FileText,
  Clock,
  Bell,
  UserPlus,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface SidebarProps {
  role: 'host' | 'visitor' | 'security' | 'admin' | 'kiosk'
  onClose?: () => void
}

const navigationItems = {
  host: [
    { href: '/host', icon: Calendar, label: 'Dashboard', description: 'Schedule visits' },
    { href: '/host/visitors', icon: Users, label: 'My Visitors', description: 'Manage visitors' },
    { href: '/host/calendar', icon: Calendar, label: 'Calendar', description: 'View schedule' },
    { href: '/host/notifications', icon: Bell, label: 'Notifications', description: 'View alerts' },
  ],
  security: [
    { href: '/security', icon: Shield, label: 'Dashboard', description: 'Monitor visitors' },
    { href: '/security/check-in', icon: UserCheck, label: 'Check-in', description: 'Visitor check-in' },
    { href: '/security/active', icon: Users, label: 'Active Visitors', description: 'Current visitors' },
    { href: '/security/alerts', icon: AlertTriangle, label: 'Alerts', description: 'Security alerts' },
    { href: '/security/reports', icon: FileText, label: 'Reports', description: 'Security reports' },
  ],
  admin: [
    { href: '/admin', icon: ChartLine, label: 'Dashboard', description: 'Analytics overview' },
    { href: '/admin/visitors', icon: Users, label: 'All Visitors', description: 'Manage all visitors' },
    { href: '/admin/hosts', icon: UserPlus, label: 'Hosts', description: 'Manage hosts' },
    { href: '/admin/reports', icon: FileText, label: 'Reports', description: 'Detailed reports' },
    { href: '/admin/settings', icon: Settings, label: 'Settings', description: 'System settings' },
  ],
  visitor: [
    { href: '/visitor', icon: Calendar, label: 'My Visit', description: 'Current visit status' },
    { href: '/visitor/pre-register', icon: UserCheck, label: 'Pre-register', description: 'Register for visit' },
    { href: '/visitor/history', icon: Clock, label: 'Visit History', description: 'Past visits' },
  ],
  kiosk: [
    { href: '/kiosk', icon: Monitor, label: 'Check-in', description: 'Self-service check-in' },
  ]
}

export function Sidebar({ role, onClose }: SidebarProps) {
  const pathname = usePathname()
  const items = navigationItems[role] || []

  const handleSignOut = () => {
    // In a real app, this would clear authentication tokens
    if (confirm('Are you sure you want to sign out?')) {
      // Clear any stored auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        sessionStorage.clear()
      }
      // Redirect to landing page
      window.location.href = '/'
    }
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VMS
            </h1>
            <p className="text-xs text-muted-foreground capitalize">{role} Portal</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="lg:block hidden">
            <ThemeToggle />
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-2.5 lg:p-3 rounded-lg transition-all duration-200 group hover:bg-accent/50 hover:scale-[1.02]",
                isActive && "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-accent-foreground shadow-sm border border-blue-100 dark:border-blue-800"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 lg:h-5 lg:w-5 transition-colors flex-shrink-0",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <div className="flex flex-col min-w-0">
                <span className={cn(
                  "text-sm font-medium transition-colors truncate",
                  isActive ? "text-blue-700 dark:text-blue-300" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {item.description}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Actions */}
      <div className="p-3 lg:p-4 border-t border-border space-y-2">
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950" 
          size="sm"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
