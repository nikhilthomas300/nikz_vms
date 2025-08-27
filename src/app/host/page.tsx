"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitorModal } from "@/components/ui/visitor-modal"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  MessageSquare,
  Edit,
  TrendingUp,
  UserCheck,
  MapPin,
  Phone
} from "lucide-react"
import { Visitor } from "@/types"
import { mockVisitors as initialVisitors } from "@/lib/data/mockData"

const getStatusBadge = (status: Visitor['status']) => {
  switch (status) {
    case "scheduled":
      return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/50">Scheduled</Badge>
    case "pre-registered":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50/50">Pre-registered</Badge>
    case "checked-in":
      return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">Checked In</Badge>
    case "in-meeting":
      return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50/50">In Meeting</Badge>
    case "checked-out":
      return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50/50">Checked Out</Badge>
    case "overdue":
      return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Overdue</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

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

export default function HostDashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors.slice(0, 8))
  const [activeTab, setActiveTab] = useState("today")

  const handleSaveVisitor = (visitor: Visitor) => {
    if (visitors.find(v => v.id === visitor.id)) {
      setVisitors(prev => prev.map(v => v.id === visitor.id ? visitor : v))
    } else {
      setVisitors(prev => [...prev, visitor])
    }
  }

  const handleDeleteVisitor = (visitorId: string) => {
    setVisitors(prev => prev.filter(v => v.id !== visitorId))
  }

  // Filter visitors based on active tab
  const filteredVisitors = visitors.filter(visitor => {
    const today = new Date().toDateString()
    const visitorDate = new Date(visitor.visitDetails.scheduledTime).toDateString()
    
    switch (activeTab) {
      case "today":
        return visitorDate === today
      case "upcoming":
        return new Date(visitor.visitDetails.scheduledTime) > new Date() && visitorDate !== today
      case "history":
        return visitor.status === "checked-out" || new Date(visitor.visitDetails.scheduledTime) < new Date()
      default:
        return true
    }
  })

  // Calculate stats
  const todayVisitors = visitors.filter(v => 
    new Date(v.visitDetails.scheduledTime).toDateString() === new Date().toDateString()
  )
  const checkedInToday = todayVisitors.filter(v => v.status === "checked-in" || v.status === "in-meeting")
  const upcomingToday = todayVisitors.filter(v => v.status === "scheduled" || v.status === "pre-registered")
  const overdueVisitors = visitors.filter(v => v.status === "overdue")

  return (
    <MainLayout 
      role="host"
      title="Host Dashboard"
      subtitle="Manage your visitor appointments and meetings"
      showClock={true}
    >
      <motion.div 
        className="space-y-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-950/30"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Today&apos;s Visitors
              </CardTitle>
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {todayVisitors.length}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Appointments scheduled
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Active Visitors
              </CardTitle>
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                {checkedInToday.length}
              </div>
              <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                Currently on-site
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Upcoming Today
              </CardTitle>
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {upcomingToday.length}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">
                Awaiting arrival
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                Overdue
              </CardTitle>
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">
                {overdueVisitors.length}
              </div>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                Require attention
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-gray-800/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks to manage your visitors efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <VisitorModal 
                  mode="create" 
                  onSave={handleSaveVisitor}
                  trigger={
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                  }
                />
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full h-12 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <Eye className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visitor Management */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Visitor Management</CardTitle>
              <CardDescription>View and manage your scheduled visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-700">
                  <TabsTrigger value="today" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <Calendar className="h-4 w-4" />
                    Today ({todayVisitors.length})
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <Clock className="h-4 w-4" />
                    Upcoming ({visitors.filter(v => new Date(v.visitDetails.scheduledTime) > new Date()).length})
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600">
                    <CheckCircle className="h-4 w-4" />
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                  {filteredVisitors.length > 0 ? (
                    <div className="space-y-3">
                      {filteredVisitors.map((visitor, index) => (
                        <motion.div
                          key={visitor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 gap-4"
                        >
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-full flex items-center justify-center shrink-0">
                              <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className="font-semibold text-lg truncate">{visitor.firstName} {visitor.lastName}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{visitor.company}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{visitor.phone}</span>
                                </span>
                              </div>
                              <p className="text-sm font-medium text-blue-600 truncate">{visitor.visitDetails.purpose}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                            <div className="text-left sm:text-right space-y-1">
                              <p className="text-sm font-medium">
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              {getStatusBadge(visitor.status)}
                            </div>
                            <div className="flex space-x-2">
                              <VisitorModal 
                                mode="view" 
                                visitor={visitor}
                                trigger={
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                }
                              />
                              <VisitorModal 
                                mode="edit" 
                                visitor={visitor}
                                onSave={handleSaveVisitor}
                                onDelete={handleDeleteVisitor}
                                trigger={
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                }
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
                      <Calendar className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No visits scheduled for today</h3>
                      <p className="text-muted-foreground mb-6">Schedule your first visitor appointment</p>
                      <VisitorModal 
                        mode="create" 
                        onSave={handleSaveVisitor}
                        trigger={<Button size="lg">Schedule a Visit</Button>}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  {filteredVisitors.length > 0 ? (
                    <div className="space-y-3">
                      {filteredVisitors.map((visitor, index) => (
                        <motion.div
                          key={visitor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 gap-4"
                        >
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 rounded-full flex items-center justify-center shrink-0">
                              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className="font-semibold text-lg truncate">{visitor.firstName} {visitor.lastName}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <span className="truncate">{visitor.company}</span>
                                <span className="truncate">{visitor.phone}</span>
                              </div>
                              <p className="text-sm font-medium text-purple-600 truncate">{visitor.visitDetails.purpose}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                            <div className="text-left sm:text-right space-y-1">
                              <p className="text-sm font-medium">
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()} at{' '}
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              {getStatusBadge(visitor.status)}
                            </div>
                            <div className="flex space-x-2">
                              <VisitorModal 
                                mode="view" 
                                visitor={visitor}
                                trigger={
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                }
                              />
                              <VisitorModal 
                                mode="edit" 
                                visitor={visitor}
                                onSave={handleSaveVisitor}
                                onDelete={handleDeleteVisitor}
                                trigger={
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                }
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
                      <Clock className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No upcoming visits</h3>
                      <p className="text-muted-foreground mb-6">Schedule future appointments with visitors</p>
                      <VisitorModal 
                        mode="create" 
                        onSave={handleSaveVisitor}
                        trigger={<Button size="lg">Schedule a Visit</Button>}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  {filteredVisitors.length > 0 ? (
                    <div className="space-y-3">
                      {filteredVisitors.map((visitor, index) => (
                        <motion.div
                          key={visitor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700/50 rounded-xl border shadow-sm gap-4"
                        >
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shrink-0">
                              <CheckCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className="font-semibold text-lg truncate">{visitor.firstName} {visitor.lastName}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <span className="truncate">{visitor.company}</span>
                                <span className="truncate">{visitor.phone}</span>
                              </div>
                              <p className="text-sm font-medium text-gray-600 truncate">{visitor.visitDetails.purpose}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                            <div className="text-left sm:text-right space-y-1">
                              <p className="text-sm font-medium">
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()}
                              </p>
                              {getStatusBadge(visitor.status)}
                            </div>
                            <VisitorModal 
                              mode="view" 
                              visitor={visitor}
                              trigger={
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              }
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
                      <CheckCircle className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No visit history</h3>
                      <p className="text-muted-foreground">Past visits will appear here after completion</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}
