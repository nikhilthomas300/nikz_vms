"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Calendar, 
  Save,
  X,
  MapPin,
  Building2,
  Clock
} from "lucide-react"
import { Meeting } from "@/types"
import { mockMeetingTypes, mockLocations } from "@/lib/data/mockData"

interface MeetingFormProps {
  meeting?: Meeting
  onSave: (meeting: Partial<Meeting>) => void
  onCancel: () => void
}

export function MeetingForm({ meeting, onSave, onCancel }: MeetingFormProps) {
  const [formData, setFormData] = useState({
    subject: meeting?.subject || "",
    description: meeting?.description || "",
    type: meeting?.type?.id || "",
    country: meeting?.country || "United States",
    location: meeting?.location?.id || "",
    tower: meeting?.tower || "",
    room: meeting?.room?.id || "",
    startTime: meeting?.startTime ? meeting.startTime.toISOString().slice(0, 16) : "",
    endTime: meeting?.endTime ? meeting.endTime.toISOString().slice(0, 16) : "",
  })

  const selectedLocation = mockLocations.find(loc => loc.id === formData.location)
  const selectedTower = selectedLocation?.towers.find(tower => tower.name === formData.tower)
  const availableRooms = selectedTower?.rooms || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const meetingType = mockMeetingTypes.find(type => type.id === formData.type)
    const location = mockLocations.find(loc => loc.id === formData.location)
    const room = availableRooms.find(r => r.id === formData.room)

    if (!meetingType || !location || !room) return

    onSave({
      subject: formData.subject,
      description: formData.description,
      type: meetingType,
      country: formData.country,
      location: location,
      tower: formData.tower,
      room: room,
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-4 md:py-6 rounded-t-lg">
          <CardTitle className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-xl md:text-2xl font-bold">
                {meeting ? "Edit Meeting" : "Create New Meeting"}
              </span>
            </div>
          </CardTitle>
          <CardDescription className="text-sm md:text-base mt-2">
            {meeting ? "Update meeting details and manage attendees" : "Schedule a new meeting and add visitors after creation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6 py-4 md:py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meeting Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Meeting Subject *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter meeting subject"
                className="w-full h-12 text-base"
                required
              />
            </div>

            {/* Meeting Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Meeting Description
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter meeting description"
                className="w-full min-h-[120px] px-4 py-3 text-base border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Meeting Type and Country */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Meeting Type *
                </Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full h-12 px-4 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select meeting type</option>
                  {mockMeetingTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Country *
                </Label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full h-12 px-4 text-base border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Location Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Location *
                  </Label>
                  <select
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      location: e.target.value,
                      tower: "",
                      room: ""
                    }))}
                    className="w-full h-12 px-4 text-base border border-input bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select location</option>
                    {mockLocations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tower */}
                <div className="space-y-2">
                  <Label htmlFor="tower" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Tower *
                  </Label>
                  <select
                    id="tower"
                    value={formData.tower}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      tower: e.target.value,
                      room: ""
                    }))}
                    className="w-full h-12 px-4 text-base border border-input bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={!selectedLocation}
                  >
                    <option value="">Select tower</option>
                    {selectedLocation?.towers.map((tower) => (
                      <option key={tower.id} value={tower.name}>
                        {tower.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room */}
                <div className="space-y-2">
                  <Label htmlFor="room" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Room *
                  </Label>
                  <select
                    id="room"
                    value={formData.room}
                    onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                    className="w-full h-12 px-4 text-base border border-input bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={!selectedTower}
                  >
                    <option value="">Select room</option>
                    {availableRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                        {room.capacity && ` (${room.capacity} people)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected Room Info */}
              {formData.room && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">
                        {availableRooms.find(r => r.id === formData.room)?.name}
                      </p>
                      <p className="text-sm text-blue-700">
                        {selectedLocation?.name} • {formData.tower}
                      </p>
                      {availableRooms.find(r => r.id === formData.room)?.capacity && (
                        <p className="text-xs text-blue-600 mt-1">
                          Capacity: {availableRooms.find(r => r.id === formData.room)?.capacity} people
                        </p>
                      )}
                      {availableRooms.find(r => r.id === formData.room)?.features && (
                        <p className="text-xs text-blue-600">
                          Features: {availableRooms.find(r => r.id === formData.room)?.features?.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Section */}
            <div className="bg-indigo-50 rounded-lg p-4 md:p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Meeting Schedule
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Start Time */}
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    Meeting Start Time *
                  </Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full h-12 text-base bg-white"
                    required
                  />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                    Meeting End Time *
                  </Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full h-12 text-base bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex items-center gap-2 h-12 px-6 w-full md:w-auto"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
              >
                <Save className="h-4 w-4" />
                {meeting ? "Update Meeting" : "Create Meeting"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}