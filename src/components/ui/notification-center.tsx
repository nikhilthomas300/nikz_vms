"use client"

import { useState } from "react"
import { Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "warning",
    title: "Visitor Overdue",
    message: "Mike Davis has exceeded his scheduled visit time by 45 minutes",
    timestamp: new Date("2024-08-27T15:30:00"),
    read: false,
    actionUrl: "/security",
    actionText: "View Details"
  },
  {
    id: "n2",
    type: "success", 
    title: "Check-in Complete",
    message: "Sarah Wilson has successfully checked in",
    timestamp: new Date("2024-08-27T15:25:00"),
    read: false
  },
  {
    id: "n3",
    type: "info",
    title: "Meeting Reminder", 
    message: "You have a meeting with John Smith in 30 minutes",
    timestamp: new Date("2024-08-27T13:30:00"),
    read: true
  },
  {
    id: "n4",
    type: "error",
    title: "Security Alert",
    message: "Unauthorized access detected in restricted area",
    timestamp: new Date("2024-08-27T15:15:00"),
    read: false,
    actionUrl: "/security",
    actionText: "Investigate"
  }
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Info className="h-4 w-4 text-blue-600" />
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'border-l-green-500 bg-green-50 dark:bg-green-950'
    case 'warning':
      return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950'
    case 'error':
      return 'border-l-red-500 bg-red-50 dark:bg-red-950'
    default:
      return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950'
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[600px] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Notifications</DialogTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={cn(
                  "border-l-4 cursor-pointer transition-colors hover:bg-muted/50",
                  getNotificationColor(notification.type),
                  !notification.read && "bg-opacity-100"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className={cn(
                            "text-sm font-medium",
                            !notification.read && "font-semibold"
                          )}>
                            {notification.title}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionUrl && notification.actionText && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Navigate to action URL
                                window.location.href = notification.actionUrl!
                              }}
                            >
                              {notification.actionText}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-2 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
