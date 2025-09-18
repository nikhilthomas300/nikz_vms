"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MeetingForm } from "@/components/forms/meeting-form"
import { MeetingDetailsPopup } from "@/components/forms/meeting-details-popup"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Plus,
  TrendingUp
} from "lucide-react"
import { Meeting, Visitor } from "@/types"
import { mockMeetings, mockEmployees } from "@/lib/data/mockData"

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

export default function EmployeePage() {
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

  const inProgressMeetings = meetings.filter(meeting => meeting.status === 'in-progress')

  const completedMeetings = meetings.filter(meeting => meeting.status === 'completed')

  if (showCreateMeeting) {
    return (
      <MainLayout role="employee" title="Employee Portal">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-6">
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
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-6"
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
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your overview</p>
              </div>
              <div className="flex gap-3">
                <Link href="/employee/meetings">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Calendar className="h-5 w-5" />
                    My Meetings
                  </Button>
                </Link>
                <Button 
                  onClick={() => setShowCreateMeeting(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  Create Meeting
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            variants={itemVariants}
          >
            <Link href="/employee/meetings">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
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
            </Link>

            <Link href="/employee/meetings">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{inProgressMeetings.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/meetings">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming</p>
                      <p className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/meetings">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{completedMeetings.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">View All Meetings</h3>
                      <p className="text-sm text-gray-600 mb-3">Manage your scheduled meetings</p>
                      <Link href="/employee/meetings">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Meetings
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Schedule Meeting</h3>
                      <p className="text-sm text-gray-600 mb-3">Create a new meeting</p>
                      <Button 
                        size="sm" 
                        onClick={() => setShowCreateMeeting(true)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Create Meeting
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Manage Visitors</h3>
                      <p className="text-sm text-gray-600 mb-3">Add visitors to meetings</p>
                      <Link href="/employee/meetings">
                        <Button size="sm" variant="outline">
                          Manage Visitors
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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