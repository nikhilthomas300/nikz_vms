"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  User,
  CheckCircle,
  Eye,
  AlertCircle
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

// Mock security alerts data
const mockSecurityAlerts = [
  {
    id: 1,
    type: "overdue_visitor",
    severity: "high",
    title: "Visitor Overdue",
    message: "John Smith has exceeded scheduled visit duration by 45 minutes",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    resolved: false,
    visitorName: "John Smith",
    location: "Building A - Floor 3"
  },
  {
    id: 2,
    type: "unauthorized_access",
    severity: "critical",
    title: "Unauthorized Access Attempt",
    message: "Failed badge scan attempt at restricted area entrance",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolved: false,
    location: "Server Room - Floor 5"
  },
  {
    id: 3,
    type: "visitor_no_show",
    severity: "medium",
    title: "Visitor No-Show",
    message: "Sarah Johnson missed scheduled appointment",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    resolved: true,
    visitorName: "Sarah Johnson",
    location: "Reception"
  },
  {
    id: 4,
    type: "emergency_contact",
    severity: "critical",
    title: "Emergency Contact Required",
    message: "Visitor medical emergency reported in conference room",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    resolved: true,
    location: "Conference Room B"
  },
  {
    id: 5,
    type: "suspicious_activity",
    severity: "high",
    title: "Suspicious Activity",
    message: "Multiple failed check-in attempts from same device",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    resolved: false,
    location: "Lobby Kiosk #2"
  }
]

export default function SecurityAlertsPage() {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState(mockSecurityAlerts)
  const [filter, setFilter] = useState<"all" | "unresolved" | "critical" | "high" | "medium">("all")

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "all") return true
    if (filter === "unresolved") return !alert.resolved
    return alert.severity === filter
  })

  const unresolvedCount = alerts.filter(alert => !alert.resolved).length
  const criticalCount = alerts.filter(alert => alert.severity === "critical" && !alert.resolved).length

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "overdue_visitor":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "unauthorized_access":
        return <Shield className="h-5 w-5 text-red-500" />
      case "visitor_no_show":
        return <User className="h-5 w-5 text-yellow-500" />
      case "emergency_contact":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "suspicious_activity":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const markAsResolved = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ))
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <MainLayout role="security" title="Security Alerts">
      <GlobalLoader isLoading={loading} text="Loading security alerts..." />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <div className="relative">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    {criticalCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {criticalCount}
                      </div>
                    )}
                  </div>
                  Security Alerts
                </h1>
                <p className="text-muted-foreground mt-2">
                  Monitor and manage security alerts and incidents
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  {unresolvedCount} Unresolved
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {["all", "unresolved", "critical", "high", "medium"].map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption as typeof filter)}
                  className="capitalize"
                >
                  {filterOption}
                  {filterOption === "unresolved" && unresolvedCount > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">
                      {unresolvedCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Alerts List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`hover:shadow-md transition-all duration-300 ${
                  !alert.resolved && alert.severity === 'critical'
                    ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30'
                    : !alert.resolved && alert.severity === 'high'
                    ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30'
                    : alert.resolved
                    ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30'
                    : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                              {alert.title}
                              {alert.resolved && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              {alert.message}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimestamp(alert.timestamp)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                <span>{alert.location}</span>
                              </div>
                              {alert.visitorName && (
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{alert.visitorName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(alert.severity)}
                            {alert.resolved && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Resolved
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                          {!alert.resolved && (
                            <Button 
                              size="sm" 
                              onClick={() => markAsResolved(alert.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <AlertTriangle className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Alerts Found</h3>
              <p className="text-muted-foreground">
                {filter === "all" 
                  ? "No security alerts at the moment. Great job maintaining security!" 
                  : `No ${filter} alerts found.`}
              </p>
            </motion.div>
          )}

          {/* Summary Stats */}
          {alerts.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {alerts.filter(a => a.severity === "critical" && !a.resolved).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {alerts.filter(a => a.severity === "high" && !a.resolved).length}
                      </div>
                      <div className="text-sm text-muted-foreground">High Priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {alerts.filter(a => a.resolved).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Resolved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{alerts.length}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
