"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/ui/location-selector"
import { MeetingDetailsPopup } from "@/components/forms/meeting-details-popup"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  Building, 
  Download,
  Calendar,
  Clock,
  MapPin,
  Search,
  Eye,
  Activity,
  RefreshCw,
  Building2,
  Bell,
  BarChart3,
  Filter,
  UserCheck,
  Phone,
  Mail,
  Building as BuildingIcon
} from "lucide-react"
import { Location, Meeting, Visitor } from "@/types"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const cardHoverVariants = {
  hover: { 
    y: -4,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300 }
  }
}

export default function ModernAdminCenterPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(mockLocations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [showMeetingDetails, setShowMeetingDetails] = useState(false)

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
    totalEmployees: 15,
    systemHealth: 98
  }

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
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">Scheduled</Badge>
      case "in-progress":
        return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">In Progress</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <MainLayout role="admin" title="" subtitle="">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-indigo-50/30 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Compact Header Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 shadow-xl shadow-blue-100/25">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <LocationSelector
                  locations={mockLocations}
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 bg-white/60 hover:bg-white/90 backdrop-blur-sm border-white/40 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Statistics Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            {/* Locations Card */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Locations</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.totalLocations}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium">All active</span>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Meetings Card */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Meetings</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.totalMeetings}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-600 font-medium">{todaysMeetings.length} scheduled today</span>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/10 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Visitors Card */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Visitors</p>
                          <p className="text-3xl font-bold text-gray-900">{stats.totalVisitors}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">{stats.activeVisitors} currently on-site</span>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/10 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Main Dashboard Content */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-blue-100/20 overflow-hidden">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b border-gray-100/50 px-6 sm:px-8 pt-6">
                  <TabsList className="grid w-full grid-cols-4 lg:w-[500px] bg-gray-50/50 backdrop-blur-sm rounded-2xl p-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">Overview</TabsTrigger>
                    <TabsTrigger value="meetings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">All Meetings</TabsTrigger>
                    <TabsTrigger value="visitors" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">All Visitors</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">Analytics</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 sm:p-8">
                  <TabsContent value="overview" className="space-y-6 mt-0">
                    {/* Location Overview */}
                    <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {selectedLocation.name}
                            </h3>
                            <p className="text-gray-600 text-sm">{selectedLocation.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-500">Online</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white/50 rounded-xl">
                          <p className="text-2xl font-bold text-blue-600">{selectedLocation.towers.length}</p>
                          <p className="text-sm text-gray-600">Towers</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-xl">
                          <p className="text-2xl font-bold text-purple-600">
                            {selectedLocation.towers.reduce((acc, tower) => acc + tower.rooms.length, 0)}
                          </p>
                          <p className="text-sm text-gray-600">Meeting Rooms</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-xl">
                          <p className="text-2xl font-bold text-emerald-600">{todaysMeetings.length}</p>
                          <p className="text-sm text-gray-600">Today&apos;s Meetings</p>
                        </div>
                      </div>
                    </div>

                    {/* Today's Meetings Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Today&apos;s Meetings</h3>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {todaysMeetings.slice(0, 3).map((meeting) => (
                          <motion.div
                            key={meeting.id}
                            whileHover={{ x: 4 }}
                            className="bg-white/70 border border-white/50 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                            onClick={() => {
                              setSelectedMeeting(meeting)
                              setShowMeetingDetails(true)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{meeting.subject}</p>
                                  <p className="text-sm text-gray-600">{meeting.employee.name} • {meeting.room.name}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {getStatusBadge(meeting.status)}
                                <span className="text-sm text-gray-500">{formatDateTime(new Date(meeting.startTime))}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Bell className="h-5 w-5 text-amber-500" />
                          Pending Approvals
                        </h3>
                        <div className="space-y-3">
                          {pendingApprovals.slice(0, 3).map((meeting) => (
                            <motion.div
                              key={meeting.id}
                              whileHover={{ x: 4 }}
                              className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                              onClick={() => {
                                setSelectedMeeting(meeting)
                                setShowMeetingDetails(true)
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{meeting.subject}</p>
                                    <p className="text-sm text-gray-600">{meeting.employee.name}</p>
                                  </div>
                                </div>
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-500" />
                          Active Visitors
                        </h3>
                        <div className="space-y-3">
                          {activeVisitors.slice(0, 3).map((visitor) => (
                            <motion.div
                              key={visitor.id}
                              whileHover={{ x: 4 }}
                              className="bg-green-50/50 border border-green-200/50 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{visitor.name}</p>
                                    <p className="text-sm text-gray-600">{visitor.company}</p>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                  {visitor.status === 'checked-in' ? 'Checked In' : 'In Meeting'}
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="meetings" className="space-y-6 mt-0">
                    {/* All Meetings - Visitor Style UI */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">All Meetings</h3>
                          <p className="text-gray-600">Manage and track all meetings across locations</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search meetings..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 w-64 bg-white/70 border-white/50 focus:bg-white focus:border-blue-300 transition-all duration-200"
                            />
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                          </Button>
                        </div>
                      </div>

                      {/* Meeting Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">{mockMeetings.length}</p>
                          <p className="text-sm text-gray-600">Total Meetings</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">{activeMeetings.length}</p>
                          <p className="text-sm text-gray-600">Active Now</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-purple-600">{todaysMeetings.length}</p>
                          <p className="text-sm text-gray-600">Today</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-amber-600">{pendingApprovals.length}</p>
                          <p className="text-sm text-gray-600">Pending</p>
                        </div>
                      </div>

                      {/* Meetings List - Visitor Style */}
                      <div className="bg-white/50 rounded-2xl border border-white/50 overflow-hidden">
                        <div className="p-4 border-b border-gray-100/50 bg-gray-50/50">
                          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                            <div className="col-span-4">Meeting Details</div>
                            <div className="col-span-2">Host</div>
                            <div className="col-span-2">Time & Date</div>
                            <div className="col-span-2">Location</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1">Actions</div>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-100/50">
                          {mockMeetings.filter(meeting =>
                            meeting.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            meeting.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ).map((meeting) => (
                            <motion.div
                              key={meeting.id}
                              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                              className="p-4 hover:bg-blue-50/30 transition-colors duration-200 cursor-pointer"
                              onClick={() => {
                                setSelectedMeeting(meeting)
                                setShowMeetingDetails(true)
                              }}
                            >
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shrink-0">
                                      <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-semibold text-gray-900 truncate">{meeting.subject}</p>
                                      <p className="text-sm text-gray-600 truncate">
                                        {meeting.visitors.length} visitor{meeting.visitors.length !== 1 ? 's' : ''}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div>
                                    <p className="font-medium text-gray-900">{meeting.employee.name}</p>
                                    <p className="text-sm text-gray-600">{meeting.employee.department}</p>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div>
                                    <p className="font-medium text-gray-900">{formatDateTime(new Date(meeting.startTime))}</p>
                                    <p className="text-sm text-gray-600">
                                      {Math.round((new Date(meeting.endTime).getTime() - new Date(meeting.startTime).getTime()) / (1000 * 60))} min
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <div>
                                    <p className="font-medium text-gray-900">{meeting.room.name}</p>
                                    <p className="text-sm text-gray-600">{meeting.tower}</p>
                                  </div>
                                </div>
                                <div className="col-span-1">
                                  {getStatusBadge(meeting.status)}
                                </div>
                                <div className="col-span-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedMeeting(meeting)
                                      setShowMeetingDetails(true)
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="visitors" className="space-y-6 mt-0">
                    {/* All Visitors List */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">All Visitors</h3>
                      <div className="bg-white/50 rounded-2xl border border-white/50 overflow-hidden">
                        <div className="p-4 border-b border-gray-100/50 bg-gray-50/50">
                          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                            <div className="col-span-3">Visitor Details</div>
                            <div className="col-span-2">Company</div>
                            <div className="col-span-2">Meeting With</div>
                            <div className="col-span-2">Visit Time</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-1">Actions</div>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-100/50">
                          {mockVisitors.map((visitor) => (
                            <motion.div
                              key={visitor.id}
                              whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                              className="p-4 hover:bg-emerald-50/30 transition-colors duration-200"
                            >
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shrink-0">
                                      <Users className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-semibold text-gray-900 truncate">{visitor.name}</p>
                                      <p className="text-sm text-gray-600 truncate">{visitor.email}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <p className="font-medium text-gray-900">{visitor.company}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="font-medium text-gray-900">{visitor.visitDetails?.employeeName}</p>
                                  <p className="text-sm text-gray-600">{visitor.visitDetails?.department}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="font-medium text-gray-900">
                                    {visitor.scheduledTime ? formatDateTime(visitor.scheduledTime) : 'N/A'}
                                  </p>
                                </div>
                                <div className="col-span-2">
                                  <Badge 
                                    className={
                                      visitor.status === 'checked-in' 
                                        ? "bg-green-100 text-green-700 border-green-200" 
                                        : visitor.status === 'in-meeting'
                                        ? "bg-blue-100 text-blue-700 border-blue-200"
                                        : "bg-gray-100 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {visitor.status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </Badge>
                                </div>
                                <div className="col-span-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 hover:bg-emerald-100"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6 mt-0">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h3>
                      
                      {/* Analytics Overview Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-2xl font-bold text-blue-600 mb-1">{Math.round(stats.totalMeetings / 30)}</p>
                          <p className="text-sm text-gray-600">Avg Meetings/Day</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-2xl font-bold text-green-600 mb-1">{Math.round(stats.totalVisitors / 30)}</p>
                          <p className="text-sm text-gray-600">Avg Visitors/Day</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-2xl font-bold text-purple-600 mb-1">85%</p>
                          <p className="text-sm text-gray-600">Meeting Completion Rate</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center">
                          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Building className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-2xl font-bold text-amber-600 mb-1">92%</p>
                          <p className="text-sm text-gray-600">Room Utilization</p>
                        </div>
                      </div>

                      {/* Chart Placeholders */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white/50 rounded-2xl border border-white/50 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                            Meeting Trends
                          </h4>
                          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">Chart visualization coming soon</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/50 rounded-2xl border border-white/50 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-500" />
                            Visitor Activity
                          </h4>
                          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">Chart visualization coming soon</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Department Statistics */}
                      <div className="bg-white/50 rounded-2xl border border-white/50 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Department Activity</h4>
                        <div className="space-y-4">
                          {['Sales', 'Engineering', 'Marketing', 'HR'].map((dept, index) => {
                            const percentage = [65, 45, 30, 25][index]
                            return (
                              <div key={dept} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                  <span className="font-medium text-gray-900">{dept}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-600 w-12">{percentage}%</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>

          {/* Meeting Details Modal */}
          {selectedMeeting && (
            <MeetingDetailsPopup
              meeting={selectedMeeting}
              isOpen={showMeetingDetails}
              onClose={() => {
                setShowMeetingDetails(false)
                setSelectedMeeting(null)
              }}
              onEdit={(meeting) => {
                console.log('Edit meeting:', meeting)
              }}
              onAddVisitor={(visitor) => {
                console.log('Add visitor:', visitor)
              }}
            />
          )}
        </div>
      </motion.div>
    </MainLayout>
  )
}