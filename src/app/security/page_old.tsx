"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  Phone,
  Mail,
  Building2,
  Calendar,
  Filter,
  MoreHorizontal,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Wifi,
  WifiOff
} from "lucide-react"
import { Meeting, Visitor, Location } from "@/types"
import { mockMeetings, mockLocations, mockVisitors } from "@/lib/data/mockData"

interface SecurityStats {
  totalVisitors: number
  activeVisitors: number
  todaysMeetings: number
  visitsInProgress: number
  pendingApprovals: number
  overdueVisitors: number
}

export default function SecurityPortalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [showMeetingDetails, setShowMeetingDetails] = useState(false)
  
  // Current security user's location (in real app, this would come from auth)
  const currentLocation = mockLocations[0]
  
  // Filter data by current location
  const locationMeetings = mockMeetings.filter(meeting => 
    meeting.location.id === currentLocation.id
  )
  
  const locationVisitors = mockVisitors.filter(visitor => 
    visitor.meetingId && locationMeetings.some(m => m.id === visitor.meetingId)
  )

  const todaysMeetings = locationMeetings.filter(meeting => {
    const today = new Date()
    const meetingDate = new Date(meeting.startTime)
    return meetingDate.toDateString() === today.toDateString()
  })

  const visitsInProgress = locationVisitors.filter(visitor => 
    visitor.status === 'in-meeting' || visitor.status === 'checked-in'
  )

  const pendingApprovals = locationMeetings.filter(meeting => 
    meeting.approvalStatus === 'pending'
  )

  const overdueVisitors = locationVisitors.filter(visitor => 
    visitor.status === 'overdue'
  )

  const stats: SecurityStats = {
    totalVisitors: locationVisitors.length,
    activeVisitors: visitsInProgress.length,
    todaysMeetings: todaysMeetings.length,
    visitsInProgress: visitsInProgress.length,
    pendingApprovals: pendingApprovals.length,
    overdueVisitors: overdueVisitors.length
  }

  const handleApproveMeeting = async (meetingId: string) => {
    // In real app, this would send an API request and email notification
    console.log(`Approving meeting ${meetingId}`)
    // Update meeting status
    // Send email notification to employee
  }

  const handleRejectMeeting = async (meetingId: string) => {
    // In real app, this would send an API request and email notification
    console.log(`Rejecting meeting ${meetingId}`)
    // Update meeting status
    // Send email notification to employee
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

  const getApprovalBadge = (status: Meeting['approvalStatus']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50/50">Pending</Badge>
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <MainLayout role="security" title="Security Portal" subtitle={`Managing ${currentLocation.name}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Location Info */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{currentLocation.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">{currentLocation.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Visitors</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalVisitors}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Visitors</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeVisitors}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Today&apos;s Meetings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.todaysMeetings}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Visits in Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.visitsInProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overdue</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.overdueVisitors}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="meetings" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                <TabsTrigger value="meetings">Today&apos;s Meetings</TabsTrigger>
                <TabsTrigger value="visitors">Active Visitors</TabsTrigger>
                <TabsTrigger value="approvals">Approvals</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="meetings" className="space-y-4 mt-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
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
                        Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Meetings List */}
                {filteredMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMeetings.map((meeting) => (
                      <Card key={meeting.id} className="bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Meeting Info */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                  <h3 className="font-semibold text-gray-900">{meeting.subject}</h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
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
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {getStatusBadge(meeting.status)}
                                  {getApprovalBadge(meeting.approvalStatus)}
                                </div>
                              </div>

                              {/* Visitors */}
                              {meeting.visitors && meeting.visitors.length > 0 && (
                                <div className="flex items-center gap-2 pt-2 border-t">
                                  <span className="text-sm font-medium text-gray-500">
                                    Visitors ({meeting.visitors.length}):
                                  </span>
                                  <div className="flex gap-2 flex-wrap">
                                    {meeting.visitors.slice(0, 3).map((visitor, idx) => (
                                      <div key={idx} className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-2 py-1">
                                        <span>{visitor.name || `${visitor.firstName} ${visitor.lastName}`}</span>
                                        {visitor.wifiRequired && <Wifi className="h-3 w-3 text-green-600" />}
                                      </div>
                                    ))}
                                    {meeting.visitors.length > 3 && (
                                      <span className="text-sm text-gray-500">+{meeting.visitors.length - 3} more</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedMeeting(meeting)
                                  setShowMeetingDetails(true)
                                }}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>

                              {meeting.approvalStatus === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApproveMeeting(meeting.id)}
                                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRejectMeeting(meeting.id)}
                                    className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                    Reject
                                  </Button>
                                </div>
                              )}
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
                        {searchTerm ? "Try adjusting your search criteria" : "No meetings scheduled for today"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="visitors" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Active Visitors</h3>
                    <p className="text-gray-500">Active visitor tracking will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approvals" className="space-y-4 mt-6">
                {pendingApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {pendingApprovals.map((meeting) => (
                      <Card key={meeting.id} className="bg-yellow-50/50 border-yellow-200">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{meeting.subject}</h3>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Employee:</span> {meeting.employee.name}
                                </div>
                                <div>
                                  <span className="font-medium">Time:</span> {formatDateTime(meeting.startTime)}
                                </div>
                                <div>
                                  <span className="font-medium">Location:</span> {meeting.room.name}
                                </div>
                                <div>
                                  <span className="font-medium">Visitors:</span> {meeting.visitors?.length || 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveMeeting(meeting.id)}
                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectMeeting(meeting.id)}
                                className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                                Reject
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
                      <CheckCircle2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                      <p className="text-gray-500">All meetings have been reviewed</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4 mt-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Security Alerts</h3>
                    <p className="text-gray-500">Security alerts and notifications will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Meeting Details Modal */}
        {selectedMeeting && (
          <Dialog open={showMeetingDetails} onOpenChange={setShowMeetingDetails}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Meeting Details
                </DialogTitle>
                <DialogDescription>
                  Review meeting information and manage approval status
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Subject</label>
                    <p className="text-sm text-gray-900">{selectedMeeting.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Employee</label>
                    <p className="text-sm text-gray-900">{selectedMeeting.employee.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date & Time</label>
                    <p className="text-sm text-gray-900">{formatDateTime(selectedMeeting.startTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-sm text-gray-900">{selectedMeeting.room.name}, {selectedMeeting.tower}</p>
                  </div>
                </div>

                {selectedMeeting.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-sm text-gray-900">{selectedMeeting.description}</p>
                  </div>
                )}

                {selectedMeeting.visitors && selectedMeeting.visitors.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Visitors ({selectedMeeting.visitors.length})
                    </label>
                    <div className="space-y-2">
                      {selectedMeeting.visitors.map((visitor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{visitor.name || `${visitor.firstName} ${visitor.lastName}`}</p>
                            <p className="text-xs text-gray-500">{visitor.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{visitor.status}</Badge>
                            {visitor.wifiRequired && <Wifi className="h-4 w-4 text-green-600" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowMeetingDetails(false)}>
                    Close
                  </Button>
                  {selectedMeeting.approvalStatus === 'pending' && (
                    <>
                      <Button
                        onClick={() => {
                          handleRejectMeeting(selectedMeeting.id)
                          setShowMeetingDetails(false)
                        }}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => {
                          handleApproveMeeting(selectedMeeting.id)
                          setShowMeetingDetails(false)
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve & Notify
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  )
}