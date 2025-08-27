"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Shield, 
  Users, 
  Clock, 
  AlertTriangle,
  UserCheck,
  Search,
  RefreshCw,
  Activity,
  MapPin,
  Eye,
  CheckCircle2,
  XCircle,
  Camera,
  Phone
} from "lucide-react"

// Mock data for security dashboard
const mockSecurityStats = {
  activeVisitors: 15,
  checkedInToday: 28,
  overdueVisitors: 2,
  totalAlerts: 3
}

const mockActiveVisitors = [
  {
    id: "1",
    name: "John Smith",
    company: "TechCorp",
    host: "Alice Johnson",
    checkInTime: "2024-08-27T14:00:00",
    badgeNumber: "B001",
    location: "Conference Room A",
    status: "active",
    phone: "+1-555-0123",
    purpose: "Business Meeting"
  },
  {
    id: "2",
    name: "Sarah Wilson",
    company: "InnovateLabs",
    host: "Bob Chen", 
    checkInTime: "2024-08-27T13:30:00",
    badgeNumber: "B002",
    location: "Reception",
    status: "active",
    phone: "+1-555-0124",
    purpose: "Interview"
  },
  {
    id: "3",
    name: "Mike Davis",
    company: "StartupX",
    host: "Carol White",
    checkInTime: "2024-08-27T15:15:00",
    badgeNumber: "B003",
    location: "Meeting Room B",
    status: "active",
    phone: "+1-555-0125",
    purpose: "Partnership Discussion"
  },
  {
    id: "4",
    name: "Emma Brown",
    company: "DesignCorp",
    host: "David Lee",
    checkInTime: "2024-08-27T12:45:00",
    badgeNumber: "B004",
    location: "Lobby",
    status: "overdue",
    phone: "+1-555-0126",
    purpose: "Consultation"
  },
]

const mockAlerts = [
  {
    id: "1",
    type: "overdue",
    message: "Emma Brown has exceeded expected visit duration",
    timestamp: "2024-08-27T16:30:00",
    severity: "high"
  },
  {
    id: "2", 
    type: "no-checkout",
    message: "2 visitors haven't checked out from yesterday",
    timestamp: "2024-08-27T09:00:00",
    severity: "medium"
  },
  {
    id: "3",
    type: "badge",
    message: "Badge B005 reported lost",
    timestamp: "2024-08-27T10:15:00",
    severity: "low"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
    case "overdue":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>
    case "expired":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Expired</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getAlertSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
    case "low":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function SecurityDashboard() {
  return (
    <MainLayout 
      role="security"
      title="Security Dashboard"
      subtitle="Monitor visitor activities and facility security"
      showClock={true}
    >
      <motion.div 
        className="space-y-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-red-50/30 to-pink-50/20 dark:from-red-950/20 dark:to-pink-950/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Security Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Active Visitors
              </CardTitle>
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                {mockSecurityStats.activeVisitors}
              </div>
              <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                Currently on-site
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Today&apos;s Check-ins
              </CardTitle>
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {mockSecurityStats.checkedInToday}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Total visitors today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                Security Alerts
              </CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">
                {mockSecurityStats.totalAlerts}
              </div>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 border-yellow-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                Overdue Visits
              </CardTitle>
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                {mockSecurityStats.overdueVisitors}
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                Past expected duration
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-gray-800/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security Actions
              </CardTitle>
              <CardDescription>Quick access to security management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transition-all duration-300">
                  <Search className="h-4 w-4 mr-2" />
                  Search Visitor
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <Camera className="h-4 w-4 mr-2" />
                  Live Cameras
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity Log
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Security Monitoring</CardTitle>
              <CardDescription>Real-time visitor monitoring and security alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-700">
                  <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <UserCheck className="h-4 w-4" />
                    Active Visitors ({mockActiveVisitors.filter(v => v.status === 'active').length})
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <AlertTriangle className="h-4 w-4" />
                    Security Alerts ({mockAlerts.length})
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <Activity className="h-4 w-4" />
                    Recent Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  <div className="space-y-3">
                    {mockActiveVisitors.map((visitor, index) => (
                      <motion.div
                        key={visitor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 gap-4"
                      >
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            visitor.status === 'active' 
                              ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700' 
                              : 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-700'
                          }`}>
                            <UserCheck className={`h-6 w-6 ${
                              visitor.status === 'active' 
                                ? 'text-green-600 dark:text-green-300' 
                                : 'text-red-600 dark:text-red-300'
                            }`} />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <p className="font-semibold text-lg truncate">{visitor.name}</p>
                              <Badge className="bg-blue-100 text-blue-800 text-xs w-fit">
                                {visitor.badgeNumber}
                              </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{visitor.company}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3 shrink-0" />
                                <span className="truncate">Host: {visitor.host}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 shrink-0" />
                                <span className="truncate">{visitor.phone}</span>
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                              <span className="text-blue-600 font-medium">{visitor.purpose}</span>
                              <span className="text-muted-foreground">📍 {visitor.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                          <div className="text-left sm:text-right space-y-1">
                            <p className="text-sm font-medium">
                              Checked in: {new Date(visitor.checkInTime).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            {getStatusBadge(visitor.status)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            {visitor.status === 'overdue' && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-4">
                  <div className="space-y-3">
                    {mockAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-red-50/20 dark:from-slate-800 dark:to-red-950/20 rounded-xl border border-red-200/30 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            alert.severity === 'high' ? 'bg-red-100 dark:bg-red-900' :
                            alert.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900' :
                            'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            <AlertTriangle className={`h-5 w-5 ${
                              alert.severity === 'high' ? 'text-red-600 dark:text-red-300' :
                              alert.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-300' :
                              'text-blue-600 dark:text-blue-300'
                            }`} />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold">{alert.message}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getAlertSeverityBadge(alert.severity)}
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="text-center py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
                    <Activity className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Activity Log</h3>
                    <p className="text-muted-foreground mb-6">Real-time visitor activity will appear here</p>
                    <Button variant="outline" size="lg">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Activity
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}
