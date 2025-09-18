"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  Building2,
  User,
  Mail,
  History,
  Timer,
  Star,
  Users,
  ChevronRight,
  QrCode,
  Navigation
} from "lucide-react"
import { Meeting, Visitor } from "@/types"
import { mockMeetings, mockVisitors } from "@/lib/data/mockData"

// Mock current visitor data
const currentVisitorEmail = "john.smith@techcorp.com"
const currentVisitor = {
  firstName: "John",
  lastName: "Smith",
  email: currentVisitorEmail,
  company: "TechCorp Solutions"
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

export default function ModernVisitorPortalPage() {
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

  const upcomingMeetings = visitorMeetings.filter(meeting => {
    const now = new Date()
    const meetingDate = new Date(meeting.startTime)
    const daysDiff = Math.ceil((meetingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysDiff <= 7 && daysDiff >= 0 && meeting.status === 'scheduled'
  })

  const stats = {
    totalMeetings: visitorMeetings.length,
    pendingMeetings: pendingMeetings.length,
    completedVisits: completedVisits.length,
    totalVisits: visitorVisits.length,
    upcomingMeetings: upcomingMeetings.length
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
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">Upcoming</Badge>
      case "in-progress":
        return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">Active</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getVisitorStatusBadge = (status: Visitor['status']) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">Scheduled</Badge>
      case "checked-in":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200">Checked In</Badge>
      case "in-meeting":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200">In Meeting</Badge>
      case "checked-out":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">Completed</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Overdue</Badge>
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

  return (
    <MainLayout role="visitor" title="Visitor Portal" subtitle="Manage your visits and registration">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50/80 via-cyan-50/40 to-blue-50/30 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Modern Header Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl shadow-cyan-100/25">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Welcome, {currentVisitor.firstName}
                      </h1>
                      <p className="text-gray-600 text-lg sm:text-xl mt-1">Your visit management portal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-cyan-100/80 text-cyan-700 px-3 py-1.5 rounded-full">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{currentVisitor.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span>{currentVisitor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 bg-white/60 hover:bg-white/90 backdrop-blur-sm border-white/40 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm"
                    >
                      <QrCode className="h-4 w-4" />
                      My QR Code
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Statistics Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            {/* Upcoming Meetings */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">Upcoming</p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.upcomingMeetings}</p>
                      <p className="text-xs text-blue-600 font-medium">Next 7 days</p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Meetings */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">Total</p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalMeetings}</p>
                      <p className="text-xs text-purple-600 font-medium">All meetings</p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Completed Visits */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stats.completedVisits}</p>
                      <p className="text-xs text-emerald-600 font-medium">Past visits</p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Visit Rating */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 border-amber-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                          <Star className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">Rating</p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">4.8</p>
                      <p className="text-xs text-amber-600 font-medium">Experience score</p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Modern Content Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-cyan-100/20 overflow-hidden">
              <Tabs defaultValue="upcoming" className="w-full">
                <div className="border-b border-gray-100/50 px-6 sm:px-8 pt-6">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:w-[400px] bg-gray-50/50 backdrop-blur-sm rounded-2xl p-1">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">
                      Upcoming
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">
                      History
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200">
                      Profile
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 sm:p-8">
                  <TabsContent value="upcoming" className="space-y-6 mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">Your Upcoming Meetings</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Timer className="h-4 w-4" />
                          <span>Next 7 days</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {upcomingMeetings.length > 0 ? (
                          <div className="space-y-4">
                            {upcomingMeetings.map((meeting, index) => (
                              <motion.div
                                key={meeting.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => handleViewDetails(meeting)}
                              >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl flex items-center justify-center">
                                      <Calendar className="h-6 w-6 text-cyan-600" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                      <h4 className="font-semibold text-gray-900 text-lg">{meeting.subject}</h4>
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <User className="h-4 w-4" />
                                          {meeting.employee.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-4 w-4" />
                                          {formatDateTime(new Date(meeting.startTime))}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          {meeting.room.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        {getStatusBadge(meeting.status)}
                                        <span className="text-xs text-gray-500">
                                          Duration: {Math.ceil((new Date(meeting.endTime).getTime() - new Date(meeting.startTime).getTime()) / (1000 * 60))} min
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="flex items-center gap-2 bg-white/70 hover:bg-white border-white/50 hover:border-gray-300 transition-all duration-200"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleViewDetails(meeting)
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                      Details
                                    </Button>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50"
                          >
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
                            <p className="text-gray-600">You&apos;re all caught up!</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-6 mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">Visit History</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <History className="h-4 w-4" />
                          <span>{completedVisits.length} completed visits</span>
                        </div>
                      </div>

                      {completedVisits.length > 0 ? (
                        <div className="space-y-4">
                          {visitorMeetings.filter(m => m.status === 'completed').slice(0, 5).map((meeting, index) => (
                            <motion.div
                              key={meeting.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div className="space-y-1">
                                    <h4 className="font-medium text-gray-900">{meeting.subject}</h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                      <span>Host: {meeting.employee.name}</span>
                                      <span>•</span>
                                      <span>{formatDateTime(new Date(meeting.startTime))}</span>
                                      <span>•</span>
                                      <span>{meeting.room.name}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(meeting.status)}
                                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                          <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No visit history</h3>
                          <p className="text-gray-600">Your completed visits will appear here</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="profile" className="space-y-6 mt-0">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Visitor Profile</h3>
                      
                      <div className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl p-6">
                        <div className="flex items-center gap-6 mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                            <User className="h-10 w-10 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">{currentVisitor.firstName} {currentVisitor.lastName}</h4>
                            <p className="text-gray-600">{currentVisitor.company}</p>
                            <p className="text-sm text-gray-500">{currentVisitor.email}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-medium text-gray-900 mb-1">Total Visits</h5>
                            <p className="text-2xl font-bold text-cyan-600">{stats.totalMeetings}</p>
                          </div>
                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-medium text-gray-900 mb-1">Average Rating</h5>
                            <p className="text-2xl font-bold text-amber-600">4.8/5</p>
                          </div>
                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-medium text-gray-900 mb-1">Preferred Location</h5>
                            <p className="text-sm text-gray-600">Main Office</p>
                          </div>
                          <div className="p-4 bg-white/50 rounded-xl">
                            <h5 className="font-medium text-gray-900 mb-1">Member Since</h5>
                            <p className="text-sm text-gray-600">January 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Visit Details Dialog */}
      <Dialog open={showVisitDetails} onOpenChange={setShowVisitDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogDescription>
              Information about your upcoming visit
            </DialogDescription>
          </DialogHeader>
          {selectedVisit && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-700">Meeting Subject:</label>
                  <p className="text-gray-900 mt-1">{selectedVisit.meeting.subject}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Host:</label>
                  <p className="text-gray-900 mt-1">{selectedVisit.meeting.employee.name}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Date & Time:</label>
                  <p className="text-gray-900 mt-1">{formatDateTime(new Date(selectedVisit.meeting.startTime))}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Duration:</label>
                  <p className="text-gray-900 mt-1">
                    {Math.ceil((new Date(selectedVisit.meeting.endTime).getTime() - new Date(selectedVisit.meeting.startTime).getTime()) / (1000 * 60))} minutes
                  </p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Location:</label>
                  <p className="text-gray-900 mt-1">{selectedVisit.meeting.room.name}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Building:</label>
                  <p className="text-gray-900 mt-1">{selectedVisit.meeting.location.name}</p>
                </div>
              </div>
              
              {selectedVisit.meeting.description && (
                <div>
                  <label className="font-medium text-gray-700">Description:</label>
                  <p className="text-gray-900 mt-1 text-sm">{selectedVisit.meeting.description}</p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowVisitDetails(false)} variant="outline" className="flex-1">
                  Close
                </Button>
                <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}