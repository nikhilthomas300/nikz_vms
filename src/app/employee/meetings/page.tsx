"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeetingForm } from "@/components/forms/meeting-form"
import { MeetingDetailsPopup } from "@/components/forms/meeting-details-popup"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Plus,
  Eye,
  Edit,
  TrendingUp,
  MapPin,
  Building2,
  CalendarPlus,
  Wifi,
  WifiOff,
  User,
  Filter,
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Meeting, Visitor } from "@/types"
import { mockMeetings, mockEmployees } from "@/lib/data/mockData"

const getMeetingStatusBadge = (status: Meeting['status']) => {
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
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50/50">Pending Approval</Badge>
    case "approved":
      return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">Approved</Badge>
    case "rejected":
      return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Rejected</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
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

export default function EmployeeMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)
  const [showCreateMeeting, setShowCreateMeeting] = useState(false)
  const [showMeetingDetails, setShowMeetingDetails] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [detailsMode, setDetailsMode] = useState<'view' | 'edit'>('view')
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Current employee (in real app, this would come from auth)
  const currentEmployee = mockEmployees[0]

  const handleCreateMeeting = (meetingData: Partial<Meeting>) => {
    const newMeeting: Meeting = {
      id: `m${Date.now()}`,
      subject: meetingData.subject!,
      description: meetingData.description || "",
      type: meetingData.type!,
      country: meetingData.country!,
      location: meetingData.location!,
      tower: meetingData.tower!,
      room: meetingData.room!,
      startTime: meetingData.startTime!,
      endTime: meetingData.endTime!,
      employeeId: currentEmployee.id,
      employee: currentEmployee,
      visitors: [],
      status: 'scheduled',
      approvalStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setMeetings(prev => [...prev, newMeeting])
    setShowCreateMeeting(false)
  }

  const handleAddVisitor = async (visitorData: Partial<Visitor>) => {
    if (!selectedMeeting) return

    const newVisitor: Visitor = {
      id: `v${Date.now()}`,
      firstName: visitorData.firstName!,
      lastName: visitorData.lastName!,
      name: visitorData.name!,
      email: visitorData.email!,
      phone: visitorData.phone!,
      company: visitorData.company,
      wifiRequired: visitorData.wifiRequired,
      meetingId: selectedMeeting.id,
      status: 'scheduled',
      scheduledTime: selectedMeeting.startTime,
      visitDetails: {
        employeeName: currentEmployee.name,
        employeeEmail: currentEmployee.email,
        department: currentEmployee.department,
        purpose: selectedMeeting.subject,
        scheduledTime: selectedMeeting.startTime,
        estimatedDuration: Math.round((selectedMeeting.endTime.getTime() - selectedMeeting.startTime.getTime()) / 60000)
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Update the meeting with new visitor
    setMeetings(prev => prev.map(meeting => 
      meeting.id === selectedMeeting.id 
        ? { ...meeting, visitors: [...(meeting.visitors || []), newVisitor] }
        : meeting
    ))

    // Update selected meeting for popup
    setSelectedMeeting(prev => prev ? {
      ...prev,
      visitors: [...(prev.visitors || []), newVisitor]
    } : null)
  }

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setDetailsMode('view')
    setShowMeetingDetails(true)
  }

  const handleEditMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setDetailsMode('edit')
    setShowMeetingDetails(true)
  }

  // Filter meetings based on search and status
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.type.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || meeting.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const todaysMeetings = filteredMeetings.filter(meeting => {
    const today = new Date()
    const meetingDate = new Date(meeting.startTime)
    return meetingDate.toDateString() === today.toDateString()
  })

  const upcomingMeetings = filteredMeetings.filter(meeting => {
    const now = new Date()
    return new Date(meeting.startTime) > now && meeting.status === 'scheduled'
  })

  const inProgressMeetings = filteredMeetings.filter(meeting => meeting.status === 'in-progress')

  const completedMeetings = filteredMeetings.filter(meeting => meeting.status === 'completed')

  if (showCreateMeeting) {
    return (
      <MainLayout role="employee" title="Employee Portal">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateMeeting(false)}
                className="mb-4"
              >
                ← Back to My Meetings
              </Button>
            </div>
            <MeetingForm 
              onSave={handleCreateMeeting}
              onCancel={() => setShowCreateMeeting(false)}
            />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout role="employee" title="Employee Portal">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-4 md:p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Meetings</h1>
                <p className="text-gray-600 mt-1">Manage your meetings and attendees</p>
              </div>
              <Button 
                onClick={() => setShowCreateMeeting(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Plus className="h-5 w-5" />
                Create Meeting
              </Button>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div 
            className="mb-6 md:mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search meetings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-input rounded-md text-sm min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
            variants={itemVariants}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Meetings</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{todaysMeetings.length}</p>
                  </div>
                  <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{inProgressMeetings.length}</p>
                  </div>
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{completedMeetings.length}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Meetings Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="all" className="w-full">
              <div className="overflow-x-auto mb-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-white/80 backdrop-blur-sm min-w-[350px]">
                  <TabsTrigger value="all" className="text-sm">All Meetings</TabsTrigger>
                  <TabsTrigger value="today" className="text-sm">Today</TabsTrigger>
                  <TabsTrigger value="upcoming" className="text-sm">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4 mt-6">
                {filteredMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredMeetings.map((meeting, index) => (
                      <MeetingCard 
                        key={meeting.id} 
                        meeting={meeting} 
                        onView={handleViewMeeting}
                        onEdit={handleEditMeeting}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState onCreateMeeting={() => setShowCreateMeeting(true)} />
                )}
              </TabsContent>

              <TabsContent value="today" className="space-y-4 mt-6">
                {todaysMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {todaysMeetings.map((meeting, index) => (
                      <MeetingCard 
                        key={meeting.id} 
                        meeting={meeting} 
                        onView={handleViewMeeting}
                        onEdit={handleEditMeeting}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No meetings scheduled for today</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                {upcomingMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {upcomingMeetings.map((meeting, index) => (
                      <MeetingCard 
                        key={meeting.id} 
                        meeting={meeting} 
                        onView={handleViewMeeting}
                        onEdit={handleEditMeeting}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No upcoming meetings</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {completedMeetings.map((meeting, index) => (
                      <MeetingCard 
                        key={meeting.id} 
                        meeting={meeting} 
                        onView={handleViewMeeting}
                        onEdit={handleEditMeeting}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No completed meetings yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Meeting Details Popup */}
        {selectedMeeting && (
          <MeetingDetailsPopup
            meeting={selectedMeeting}
            isOpen={showMeetingDetails}
            onClose={() => setShowMeetingDetails(false)}
            onEdit={handleEditMeeting}
            onAddVisitor={handleAddVisitor}
            mode={detailsMode}
          />
        )}
      </motion.div>
    </MainLayout>
  )
}

interface MeetingCardProps {
  meeting: Meeting
  onView: (meeting: Meeting) => void
  onEdit: (meeting: Meeting) => void
  index: number
}

function MeetingCard({ meeting, onView, onEdit, index }: MeetingCardProps) {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 
      }
    }
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

  const getDuration = (start: Date, end: Date) => {
    const diffMs = end.getTime() - start.getTime()
    const diffMins = Math.round(diffMs / (1000 * 60))
    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`
    }
    return `${mins}m`
  }

  return (
    <motion.div variants={cardVariants}>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Header with Status Badges */}
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1 pr-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm md:text-base">
                  {meeting.subject}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{meeting.type.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                {getMeetingStatusBadge(meeting.status)}
                {getApprovalBadge(meeting.approvalStatus)}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{formatDateTime(meeting.startTime)}</span>
                <span className="text-gray-400">•</span>
                <span className="flex-shrink-0">{getDuration(meeting.startTime, meeting.endTime)}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{meeting.room.name}, {meeting.tower}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{meeting.location.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                <span>{meeting.visitors?.length || 0} visitor{(meeting.visitors?.length || 0) !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Visitors Preview */}
            {meeting.visitors && meeting.visitors.length > 0 && (
              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Visitors ({meeting.visitors.length})
                  </p>
                </div>
                <div className="space-y-2">
                  {meeting.visitors.slice(0, 2).map((visitor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-2 w-2 md:h-3 md:w-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700 truncate flex-1">
                        {visitor.name || `${visitor.firstName} ${visitor.lastName}`}
                      </span>
                      {visitor.wifiRequired ? (
                        <Wifi className="h-3 w-3 text-green-600 flex-shrink-0" />
                      ) : (
                        <WifiOff className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                  {meeting.visitors.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{meeting.visitors.length - 2} more
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onView(meeting)
                }}
                className="flex items-center gap-1 flex-1 text-xs md:text-sm"
              >
                <Eye className="h-3 w-3 md:h-4 md:w-4" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(meeting)
                }}
                className="flex items-center gap-1 flex-1 text-xs md:text-sm"
              >
                <Edit className="h-3 w-3 md:h-4 md:w-4" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EmptyState({ onCreateMeeting }: { onCreateMeeting: () => void }) {
  return (
    <motion.div 
      className="text-center py-12"
      variants={itemVariants}
    >
      <CalendarPlus className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
      <p className="text-sm md:text-base text-gray-500 mb-6">Create your first meeting or adjust your search filters</p>
      <Button 
        onClick={onCreateMeeting}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Your First Meeting
      </Button>
    </motion.div>
  )
}