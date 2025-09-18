"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Eye,
  MessageCircle,
  Building2,
  User,
  Wifi,
  WifiOff,
  Phone,
  Mail,
  FileText
} from "lucide-react"
import { Meeting, Visitor } from "@/types"
import { mockMeetings, mockVisitors } from "@/lib/data/mockData"

// Mock current visitor data (in real app, this would come from auth)
const currentVisitorEmail = "john.smith@techcorp.com"

export default function VisitorPortalPage() {
  const [showVisitDetails, setShowVisitDetails] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<{meeting: Meeting, visitor: Visitor} | null>(null)

  // Get visitor's meetings and visits
  const visitorMeetings = mockMeetings.filter(meeting => 
    meeting.visitors?.some(visitor => visitor.email === currentVisitorEmail)
  )

  const visitorVisits = mockVisitors.filter(visitor => 
    visitor.email === currentVisitorEmail
  )

  const pendingMeetings = visitorMeetings.filter(meeting => {
    const now = new Date()
    return new Date(meeting.startTime) > now && meeting.status === 'scheduled'
  })

  const completedVisits = visitorVisits.filter(visitor => 
    visitor.status === 'checked-out'
  )

  const stats = {
    totalMeetings: visitorMeetings.length,
    pendingMeetings: pendingMeetings.length,
    completedVisits: completedVisits.length,
    totalVisits: visitorVisits.length
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
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

  const getVisitorStatusBadge = (status: Visitor['status']) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/50">Scheduled</Badge>
      case "checked-in":
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">Checked In</Badge>
      case "in-meeting":
        return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50/50">In Meeting</Badge>
      case "checked-out":
        return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50/50">Completed</Badge>
      case "overdue":
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Overdue</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleViewDetails = (meeting: Meeting) => {
    const visitorData = meeting.visitors?.find(v => v.email === currentVisitorEmail)
    if (visitorData) {
      setSelectedVisit({ meeting, visitor: visitorData })
      setShowVisitDetails(true)
    }
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

  return (
    <MainLayout role="visitor" title="Visitor Portal">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Visits</h1>
                <p className="text-gray-600 mt-1">Track your meetings and visit history</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            variants={itemVariants}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMeetings}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingMeetings}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedVisits}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Visits</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="pending">Pending Meetings</TabsTrigger>
                <TabsTrigger value="history">Visit History</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pendingMeetings.map((meeting, index) => {
                      const visitorData = meeting.visitors?.find(v => v.email === currentVisitorEmail)
                      return (
                        <motion.div
                          key={meeting.id}
                          variants={itemVariants}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1 flex-1 pr-2">
                                    <h3 className="font-semibold text-gray-900">{meeting.subject}</h3>
                                    <p className="text-sm text-gray-600">{meeting.type.name}</p>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    {getStatusBadge(meeting.status)}
                                  </div>
                                </div>

                                {/* Meeting Details */}
                                <div className="space-y-3 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span><strong>Host:</strong> {meeting.employee.name}</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{formatDateTime(meeting.startTime)}</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{meeting.room.name}, {meeting.tower}</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                    <span>{meeting.location.name}</span>
                                  </div>

                                  {visitorData?.wifiRequired && (
                                    <div className="flex items-center gap-2">
                                      <Wifi className="h-4 w-4 text-green-600" />
                                      <span className="text-green-600">WiFi access provided</span>
                                    </div>
                                  )}
                                </div>

                                {/* Action Button */}
                                <div className="pt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(meeting)}
                                    className="w-full flex items-center gap-2"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No pending meetings</h3>
                      <p className="text-gray-500">You don&apos;t have any upcoming meetings scheduled</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                {visitorVisits.length > 0 ? (
                  <div className="space-y-4">
                    {visitorVisits.map((visit, index) => {
                      const relatedMeeting = mockMeetings.find(m => m.id === visit.meetingId)
                      return (
                        <motion.div
                          key={visit.id}
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h3 className="font-semibold text-gray-900">
                                        {relatedMeeting ? relatedMeeting.subject : visit.visitDetails.purpose}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        with {visit.visitDetails.employeeName}
                                      </p>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                      {getVisitorStatusBadge(visit.status)}
                                      <span className="text-xs text-gray-500">
                                        {formatDateTime(new Date(visit.visitDetails.scheduledTime))}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                    <div>
                                      <span className="font-medium">Location:</span>
                                      <br />
                                      {visit.visitDetails.meetingLocation || 'N/A'}
                                    </div>
                                    <div>
                                      <span className="font-medium">Duration:</span>
                                      <br />
                                      {visit.visitDetails.estimatedDuration} mins
                                    </div>
                                    <div>
                                      <span className="font-medium">Department:</span>
                                      <br />
                                      {visit.visitDetails.department}
                                    </div>
                                    <div>
                                      <span className="font-medium">Badge:</span>
                                      <br />
                                      {visit.badgeId || 'N/A'}
                                    </div>
                                  </div>

                                  {visit.checkInTime && visit.checkOutTime && (
                                    <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                                      <div className="flex justify-between">
                                        <span>Check-in: {formatDateTime(visit.checkInTime)}</span>
                                        <span>Check-out: {formatDateTime(visit.checkOutTime)}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="ml-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      if (relatedMeeting) {
                                        setSelectedVisit({ meeting: relatedMeeting, visitor: visit })
                                        setShowVisitDetails(true)
                                      }
                                    }}
                                    className="flex items-center gap-2"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No visit history</h3>
                      <p className="text-gray-500">Your completed visits will appear here</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Profile</CardTitle>
                    <CardDescription>Your information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 bg-blue-100">
                        <div className="w-full h-full flex items-center justify-center text-blue-600 font-medium text-lg">
                          JS
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">John Smith</h3>
                        <p className="text-gray-600">{currentVisitorEmail}</p>
                        <p className="text-gray-600">TechCorp Inc.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Contact Information</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {currentVisitorEmail}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            +1-555-0123
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Visit Preferences</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Wifi className="h-4 w-4 text-green-600" />
                            WiFi access typically required
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MessageCircle className="h-4 w-4 text-blue-600" />
                            Email notifications enabled
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Visit Details Modal */}
        {selectedVisit && (
          <Dialog open={showVisitDetails} onOpenChange={setShowVisitDetails}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Visit Details
                </DialogTitle>
                <DialogDescription>
                  Detailed information about your visit
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Meeting Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Meeting Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Subject</label>
                      <p className="text-sm text-gray-900">{selectedVisit.meeting.subject}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <p className="text-sm text-gray-900">{selectedVisit.meeting.type.name}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Host</label>
                      <p className="text-sm text-gray-900">{selectedVisit.meeting.employee.name}</p>
                      <p className="text-xs text-gray-500">{selectedVisit.meeting.employee.department}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Date & Time</label>
                      <p className="text-sm text-gray-900">{formatDateTime(selectedVisit.meeting.startTime)}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-sm text-gray-900">
                        {selectedVisit.meeting.room.name}, {selectedVisit.meeting.tower}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedVisit.meeting.location.name}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <div className="mt-1">
                        {getVisitorStatusBadge(selectedVisit.visitor.status)}
                      </div>
                    </div>
                  </div>

                  {selectedVisit.meeting.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-sm text-gray-900">{selectedVisit.meeting.description}</p>
                    </div>
                  )}
                </div>

                {/* Visit Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Visit Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Badge Number</label>
                      <p className="text-sm text-gray-900">{selectedVisit.visitor.badgeId || 'Not assigned'}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">WiFi Access</label>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedVisit.visitor.wifiRequired ? (
                          <>
                            <Wifi className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Provided</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Not required</span>
                          </>
                        )}
                      </div>
                    </div>

                    {selectedVisit.visitor.checkInTime && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Check-in Time</label>
                        <p className="text-sm text-gray-900">
                          {formatDateTime(selectedVisit.visitor.checkInTime)}
                        </p>
                      </div>
                    )}

                    {selectedVisit.visitor.checkOutTime && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Check-out Time</label>
                        <p className="text-sm text-gray-900">
                          {formatDateTime(selectedVisit.visitor.checkOutTime)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowVisitDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </MainLayout>
  )
}
