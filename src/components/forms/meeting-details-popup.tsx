"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  Building2,
  Wifi,
  WifiOff,
  User,
  Edit,
  Plus
} from "lucide-react"
import { Meeting, Visitor } from "@/types"
import { AddVisitorPopup } from "./add-visitor-popup"

interface MeetingDetailsPopupProps {
  meeting: Meeting
  isOpen: boolean
  onClose: () => void
  onEdit: (meeting: Meeting) => void
  onAddVisitor: (visitor: Partial<Visitor>) => void
  mode?: 'view' | 'edit'
}

export function MeetingDetailsPopup({ 
  meeting, 
  isOpen, 
  onClose, 
  onEdit, 
  onAddVisitor,
  mode = 'view'
}: MeetingDetailsPopupProps) {
  const [showAddVisitor, setShowAddVisitor] = useState(false)

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
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50/50">Pending Approval</Badge>
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/50">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
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

  const getDuration = () => {
    const start = new Date(meeting.startTime)
    const end = new Date(meeting.endTime)
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col h-full max-h-[85vh]">
            <DialogHeader className="px-4 md:px-6 py-4 md:py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <DialogTitle className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-lg md:text-xl font-semibold">Meeting Details</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(meeting.status)}
                  {getApprovalBadge(meeting.approvalStatus)}
                </div>
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base">
                View and manage meeting information and attendees
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
              <div className="space-y-6">
                {/* Meeting Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Meeting Information
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Subject</h4>
                        <p className="text-base font-medium text-gray-900">{meeting.subject}</p>
                      </div>

                      {meeting.description && (
                        <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                          <h4 className="text-sm font-medium text-gray-600 mb-1">Description</h4>
                          <p className="text-sm text-gray-700">{meeting.description}</p>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Meeting Type</h4>
                        <p className="text-sm text-gray-900">{meeting.type.name}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Host</h4>
                        <p className="text-sm font-medium text-gray-900">{meeting.employee.name}</p>
                        <p className="text-xs text-gray-500">{meeting.employee.department} • {meeting.employee.title}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <h4 className="text-sm font-medium text-blue-800">Schedule</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-blue-600">Start Time</p>
                            <p className="text-sm font-medium text-blue-900">{formatDateTime(meeting.startTime)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-600">End Time</p>
                            <p className="text-sm font-medium text-blue-900">{formatDateTime(meeting.endTime)}</p>
                            <p className="text-xs text-blue-500 mt-1">Duration: {getDuration()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3 md:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <h4 className="text-sm font-medium text-green-800">Location</h4>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-green-900">
                            {meeting.room.name}
                          </p>
                          <p className="text-xs text-green-700">
                            {meeting.tower} • {meeting.location.name}
                          </p>
                          <p className="text-xs text-green-600">
                            {meeting.location.address}, {meeting.country}
                          </p>
                          {meeting.room.capacity && (
                            <div className="flex items-center gap-1 mt-2">
                              <Users className="h-3 w-3 text-green-600" />
                              <p className="text-xs text-green-700">
                                Capacity: {meeting.room.capacity} people
                              </p>
                            </div>
                          )}
                          {meeting.room.features && meeting.room.features.length > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                              Features: {meeting.room.features.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visitors Section */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Visitors ({meeting.visitors?.length || 0})
                    </h3>
                    <Button
                      onClick={() => setShowAddVisitor(true)}
                      size="sm"
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
                    >
                      <Plus className="h-4 w-4" />
                      Add Visitor
                    </Button>
                  </div>

                  {meeting.visitors && meeting.visitors.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                      {meeting.visitors.map((visitor, index) => (
                        <div key={visitor.id || index} className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {visitor.name || `${visitor.firstName} ${visitor.lastName}`}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600">
                                {visitor.email && (
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    <span className="truncate">{visitor.email}</span>
                                  </div>
                                )}
                                {visitor.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    <span>{visitor.phone}</span>
                                  </div>
                                )}
                              </div>
                              {visitor.company && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                                  <Building2 className="h-3 w-3" />
                                  <span>{visitor.company}</span>
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {visitor.status}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  {visitor.wifiRequired ? (
                                    <>
                                      <Wifi className="h-4 w-4 text-green-600" />
                                      <span className="text-xs text-green-600">WiFi</span>
                                    </>
                                  ) : (
                                    <WifiOff className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-500 mb-3">No visitors added to this meeting yet.</p>
                      <Button
                        onClick={() => setShowAddVisitor(true)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add First Visitor
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-3 px-4 md:px-6 py-4 border-t bg-gray-50">
              <Button variant="outline" onClick={onClose} className="w-full md:w-auto">
                Close
              </Button>
              {mode === 'view' && (
                <Button
                  onClick={() => onEdit(meeting)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                >
                  <Edit className="h-4 w-4" />
                  Edit Meeting
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddVisitorPopup
        isOpen={showAddVisitor}
        onClose={() => setShowAddVisitor(false)}
        onAddVisitor={onAddVisitor}
        meetingId={meeting.id}
      />
    </>
  )
}