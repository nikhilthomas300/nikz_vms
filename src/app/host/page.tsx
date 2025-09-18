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
  MapPin,
  Building2,
  CalendarPlus,
  User,
  X
} from "lucide-react"
import { Meeting } from "@/types"
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

export default function HostDashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings)
  const [showCreateMeeting, setShowCreateMeeting] = useState(false)
  const [showMeetingDetails, setShowMeetingDetails] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [detailsMode, setDetailsMode] = useState<'view' | 'edit'>('view')

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
      status: "scheduled" as Meeting['status'],
      approvalStatus: "pending" as Meeting['approvalStatus'],
      employeeId: currentEmployee.id,
      employee: currentEmployee,
      visitors: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setMeetings(prev => [...prev, newMeeting])
    setShowCreateMeeting(false)
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

  const todaysMeetings = meetings.filter(meeting => {
    const today = new Date()
    const meetingDate = new Date(meeting.startTime)
    return meetingDate.toDateString() === today.toDateString()
  })

  const upcomingMeetings = meetings.filter(meeting => {
    const now = new Date()
    return new Date(meeting.startTime) > now && meeting.status === 'scheduled'
  })

  const completedMeetings = meetings.filter(meeting => meeting.status === 'completed')
  const totalVisitors = meetings.reduce((sum, meeting) => sum + (meeting.visitors?.length || 0), 0)

  return (
    <MainLayout role="host" title="Employee Portal">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6"
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
                <h1 className="text-3xl font-bold text-gray-900">My Meetings</h1>
                <p className="text-gray-600 mt-1">Create and manage your meetings with visitors</p>
              </div>
              <Button
                onClick={() => setShowCreateMeeting(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Meeting
              </Button>
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
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Meetings</p>
                    <p className="text-2xl font-bold text-gray-900">{todaysMeetings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{completedMeetings.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                    <p className="text-2xl font-bold text-gray-900">{totalVisitors}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="all">All Meetings</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {meetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {meetings.map((meeting, index) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onView={() => handleViewMeeting(meeting)}
                        onEdit={() => handleEditMeeting(meeting)}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {todaysMeetings.map((meeting, index) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onView={() => handleViewMeeting(meeting)}
                        onEdit={() => handleEditMeeting(meeting)}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings today</h3>
                      <p className="text-gray-500">You don&apos;t have any meetings scheduled for today</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                {upcomingMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {upcomingMeetings.map((meeting, index) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onView={() => handleViewMeeting(meeting)}
                        onEdit={() => handleEditMeeting(meeting)}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
                      <p className="text-gray-500">All caught up! No upcoming meetings scheduled</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedMeetings.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {completedMeetings.map((meeting, index) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onView={() => handleViewMeeting(meeting)}
                        onEdit={() => handleEditMeeting(meeting)}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No completed meetings</h3>
                      <p className="text-gray-500">Your completed meetings will appear here</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Meeting Form Modal */}
        {showCreateMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Meeting</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateMeeting(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <MeetingForm 
                onSave={handleCreateMeeting}
                onCancel={() => setShowCreateMeeting(false)}
              />
            </div>
          </div>
        )}

        {/* Meeting Details Modal */}
        {showMeetingDetails && selectedMeeting && (
          <MeetingDetailsPopup
            meeting={selectedMeeting}
            isOpen={showMeetingDetails}
            onClose={() => {
              setShowMeetingDetails(false)
              setSelectedMeeting(null)
            }}
            onEdit={(updatedMeeting) => {
              setMeetings(prev => prev.map(m => 
                m.id === updatedMeeting.id ? updatedMeeting : m
              ))
            }}
            onAddVisitor={() => {}}
            mode={detailsMode}
          />
        )}
      </motion.div>
    </MainLayout>
  )
}

interface MeetingCardProps {
  meeting: Meeting
  onView: () => void
  onEdit: () => void
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1 pr-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {meeting.subject}
                </h3>
                <p className="text-sm text-gray-600">{meeting.type.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                {getMeetingStatusBadge(meeting.status)}
                {getApprovalBadge(meeting.approvalStatus)}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formatDateTime(meeting.startTime)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{meeting.room.name}, {meeting.tower}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span>{meeting.location.name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{meeting.visitors?.length || 0} visitor(s)</span>
              </div>

              {meeting.visitors && meeting.visitors.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <div className="flex -space-x-1">
                    {meeting.visitors.slice(0, 3).map((visitor, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-medium border-2 border-white"
                        title={visitor.name}
                      >
                        {visitor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {meeting.visitors.length > 3 && (
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border-2 border-white">
                        +{meeting.visitors.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {meeting.description && (
              <p className="text-sm text-gray-500 line-clamp-2">
                {meeting.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onView}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
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
    <Card>
      <CardContent className="p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CalendarPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No meetings yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start by creating your first meeting and inviting visitors to join you.
          </p>
          <Button 
            onClick={onCreateMeeting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Meeting
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}