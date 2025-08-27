"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { EnhancedTopbar } from "@/components/layout/enhanced-topbar"

interface MainLayoutProps {
  children: React.ReactNode
  role: 'host' | 'visitor' | 'security' | 'admin' | 'kiosk'
  title: string
  subtitle?: string
  userRoles?: Array<'host' | 'visitor' | 'security' | 'admin'>
  showClock?: boolean
}

export function MainLayout({ 
  children, 
  role, 
  title, 
  subtitle, 
  userRoles = [],
  showClock = false
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleRoleSwitch = (newRole: 'host' | 'visitor' | 'security' | 'admin') => {
    // In a real app, this would update the user's current role and redirect
    console.log('Switching to role:', newRole)
    // For demo purposes, we could redirect to the appropriate dashboard
    switch (newRole) {
      case 'host':
        window.location.href = '/host'
        break
      case 'visitor':
        window.location.href = '/visitor'
        break
      case 'security':
        window.location.href = '/security'
        break
      case 'admin':
        window.location.href = '/admin'
        break
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <EnhancedTopbar 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setSidebarOpen(true)}
          currentRole={role}
          userRoles={userRoles}
          onRoleSwitch={handleRoleSwitch}
          showClock={showClock}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
