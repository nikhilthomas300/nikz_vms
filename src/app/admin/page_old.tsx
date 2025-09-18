"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { LocationSelector } from "@/components/ui/location-selector"
import { motion } from "framer-motion"
import { 
  Users, 
  Building, 
  Shield, 
  TrendingUp,
  Download,
  Settings,
  UserCog,
  BarChart3,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  Activity,
  RefreshCw,
  Building2,
  Wifi,
  MoreHorizontal,
  FileText,
  PieChart
} from "lucide-react"
import { Location, Meeting } from "@/types"
import { mockLocations, mockMeetings, mockVisitors } from "@/lib/data/mockData"

interface AdminStats {
  totalLocations: number
  totalMeetings: number
  totalVisitors: number
  activeMeetings: number
  activeVisitors: number
  pendingApprovals: number
  totalEmployees: number
  systemHealth: number
}

export default function AdminCenterPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(mockLocations[0])
  const [searchTerm, setSearchTerm] = useState("")

  // Filter data by selected location
  const locationMeetings = mockMeetings.filter(meeting => 
    meeting.location.id === selectedLocation.id
  )
  
  const locationVisitors = mockVisitors.filter(visitor => 
    visitor.meetingId && locationMeetings.some(m => m.id === visitor.meetingId)
  )

  // Calculate stats
  const todaysMeetings = locationMeetings.filter(meeting => {
    const today = new Date()
    const meetingDate = new Date(meeting.startTime)
    return meetingDate.toDateString() === today.toDateString()
  })

  const activeMeetings = locationMeetings.filter(meeting => 
    meeting.status === 'in-progress'
  )

  const activeVisitors = locationVisitors.filter(visitor => 
    visitor.status === 'in-meeting' || visitor.status === 'checked-in'
  )

  const pendingApprovals = locationMeetings.filter(meeting => 
    meeting.approvalStatus === 'pending'
  )

  const stats: AdminStats = {
    totalLocations: mockLocations.length,
    totalMeetings: mockMeetings.length,
    totalVisitors: mockVisitors.length,
    activeMeetings: activeMeetings.length,
    activeVisitors: activeVisitors.length,
    pendingApprovals: pendingApprovals.length,
    totalEmployees: 15, // Mock data
    systemHealth: 98
  }

  const filteredMeetings = todaysMeetings.filter(meeting =>
    meeting.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadge = (status: Meeting['status']) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/50">Scheduled</Badge>
      case "in-progress":
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">In Progress</Badge>
      case "completed":
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50/50">Completed</Badge>
      case "cancelled":
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <MainLayout role="admin" title="Admin Center" subtitle="Multi-location management and reporting">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Modern Header with Glass Morphism */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-100/20">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Admin Center
                    </h1>
                  </div>
                  <p className="text-gray-600 text-lg max-w-2xl">Comprehensive management across all locations with real-time insights</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                  <LocationSelector
                    locations={mockLocations}
                    selectedLocation={selectedLocation}
                    onLocationChange={setSelectedLocation}
                  />
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-white/30 text-gray-700 hover:text-gray-900 transition-all duration-200"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg transition-all duration-200"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modern Stats Overview with Enhanced Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-blue-50/30 border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalLocations}</p>
                    <p className="text-sm text-gray-500 font-medium">Locations</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-purple-50/30 border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalMeetings}</p>
                    <p className="text-sm text-gray-500 font-medium">Total Meetings</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-green-50/30 border-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalVisitors}</p>
                    <p className="text-sm text-gray-500 font-medium">Total Visitors</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-orange-50/30 border-orange-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.activeMeetings}</p>
                    <p className="text-sm text-gray-500 font-medium">Active Meetings</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-indigo-50/30 border-indigo-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <UserCog className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.activeVisitors}</p>
                    <p className="text-sm text-gray-500 font-medium">Active Visitors</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-yellow-50/30 border-yellow-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingApprovals}</p>
                    <p className="text-sm text-gray-500 font-medium">Pending</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-teal-50/30 border-teal-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalEmployees}</p>
                    <p className="text-sm text-gray-500 font-medium">Employees</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-emerald-50/30 border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stats.systemHealth}%</p>
                    <p className="text-sm text-gray-500 font-medium">System Health</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Modern Tabs with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-blue-100/20">
              <Tabs defaultValue="meetings" className="w-full">
                <div className="border-b border-gray-100/50 px-6 sm:px-8 pt-6">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 lg:w-[500px] bg-gray-50/50 backdrop-blur-sm">
                    <TabsTrigger value="meetings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Meetings</TabsTrigger>
                    <TabsTrigger value="visitors" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Visitors</TabsTrigger>
                    <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Reports</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Settings</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 sm:p-8">
                  <TabsContent value="meetings" className="space-y-6 mt-0">
                    {/* Current Location Info with Modern Design */}
                    <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {selectedLocation.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 flex items-center gap-2 ml-13">
                            <MapPin className="h-4 w-4" />
                            {selectedLocation.address}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-500 ml-13">
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {selectedLocation.towers.length} towers
                            </span>
                            <span className="flex items-center gap-1">
                              <PieChart className="h-4 w-4" />
                              {selectedLocation.towers.reduce((acc, tower) => acc + tower.rooms.length, 0)} rooms
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {todaysMeetings.length} meetings today
                            </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">{todaysMeetings.length}</p>
                          <p className="text-sm text-gray-600">Today's Meetings</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Search and Filters */}
                    <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search meetings by subject or employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/70 border-white/50 focus:bg-white focus:border-blue-300 transition-all duration-200"
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2 bg-white/70 hover:bg-white border-white/50 hover:border-gray-300 transition-all duration-200"
                        >
                          <Filter className="h-4 w-4" />
                          Advanced Filters
                        </Button>
                      </div>
                    </div>

                    {/* Modern Meeting Cards */}
                    {filteredMeetings.length > 0 ? (
                      <div className="space-y-4">
                        {filteredMeetings.map((meeting, index) => (
                          <motion.div
                            key={meeting.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -2 }}
                          >
                            <Card className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-white/50 hover:border-white/70 hover:shadow-xl transition-all duration-300">
                              <CardContent className="p-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search meetings by subject or employee..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Advanced Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Meetings Table/Cards */}
                {filteredMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMeetings.map((meeting) => (
                      <Card key={meeting.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Meeting Info */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                  <h3 className="font-semibold text-gray-900">{meeting.subject}</h3>
                                  <p className="text-sm text-gray-600">{meeting.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <UserCog className="h-4 w-4" />
                                      {meeting.employee.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {formatDateTime(meeting.startTime)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {meeting.room.name}, {meeting.tower}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Building2 className="h-4 w-4" />
                                      {meeting.type.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {getStatusBadge(meeting.status)}
                                </div>
                              </div>

                              {/* Visitors */}
                              {meeting.visitors && meeting.visitors.length > 0 && (
                                <div className="flex items-center gap-2 pt-2 border-t">
                                  <span className="text-sm font-medium text-gray-500">
                                    Visitors ({meeting.visitors.length}):
                                  </span>
                                  <div className="flex gap-2 flex-wrap">
                                    {meeting.visitors.slice(0, 4).map((visitor, idx) => (
                                      <div key={idx} className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-2 py-1">
                                        <span>{visitor.name || `${visitor.firstName} ${visitor.lastName}`}</span>
                                        {visitor.wifiRequired && <Wifi className="h-3 w-3 text-green-600" />}
                                      </div>
                                    ))}
                                    {meeting.visitors.length > 4 && (
                                      <span className="text-sm text-gray-500">+{meeting.visitors.length - 4} more</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                      <p className="text-gray-500">
                        {searchTerm ? "Try adjusting your search criteria" : "No meetings scheduled for today at this location"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="visitors" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Visitor Management</h3>
                    <p className="text-gray-500">Comprehensive visitor tracking and management tools</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Meeting Reports</h3>
                          <p className="text-sm text-gray-600 mb-3">Detailed meeting analytics and trends</p>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Visitor Reports</h3>
                          <p className="text-sm text-gray-600 mb-3">Visitor activity and statistics</p>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Security Reports</h3>
                          <p className="text-sm text-gray-600 mb-3">Security incidents and compliance</p>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Meeting Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        Chart placeholder - Meeting trends over time
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Visitor Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        Chart placeholder - Visitor distribution by location
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Settings className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                    <p className="text-gray-500">Configure system-wide settings and preferences</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}