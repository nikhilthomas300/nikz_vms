"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  BellRing, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar
} from "lucide-react"
import { GlobalLoader } from "@/components/ui/global-loader"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "visitor_arrival",
    title: "Visitor has arrived",
    message: "John Smith from TechCorp has checked in for your 2:00 PM meeting",
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    read: false,
    priority: "high"
  },
  {
    id: 2,
    type: "visitor_scheduled",
    title: "New visitor scheduled",
    message: "Sarah Johnson from DataFlow scheduled a visit for tomorrow at 10:30 AM",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: "medium"
  },
  {
    id: 3,
    type: "visitor_cancelled",
    title: "Visit cancelled",
    message: "Mike Wilson has cancelled his appointment scheduled for today at 3:00 PM",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    priority: "medium"
  },
  {
    id: 4,
    type: "reminder",
    title: "Upcoming meeting reminder",
    message: "You have a meeting with Lisa Brown in 30 minutes",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    priority: "low"
  }
]

export default function HostNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "high" | "medium" | "low">("all")

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.priority === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "visitor_arrival":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "visitor_scheduled":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "visitor_cancelled":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return timestamp.toLocaleDateString()
  }

  return (
    <MainLayout role="host" title="Notifications">
      <GlobalLoader isLoading={loading} text="Loading notifications..." />
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <div className="relative">
                    <BellRing className="h-8 w-8 text-blue-600" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </div>
                    )}
                  </div>
                  Notifications
                </h1>
                <p className="text-muted-foreground mt-2">
                  Stay updated with your visitor activities
                </p>
              </div>
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={markAllAsRead}
                  className="hover:bg-blue-50"
                >
                  Mark All as Read
                </Button>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {["all", "unread", "high", "medium", "low"].map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption as typeof filter)}
                  className="capitalize"
                >
                  {filterOption}
                  {filterOption === "unread" && unreadCount > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Notifications List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                onClick={() => !notification.read && markAsRead(notification.id)}
                className="cursor-pointer"
              >
                <Card className={`hover:shadow-md transition-all duration-300 ${
                  !notification.read 
                    ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800' 
                    : ''
                }`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Bell className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notifications Found</h3>
              <p className="text-muted-foreground">
                {filter === "all" 
                  ? "You're all caught up! No notifications at the moment." 
                  : `No ${filter} notifications found.`}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
