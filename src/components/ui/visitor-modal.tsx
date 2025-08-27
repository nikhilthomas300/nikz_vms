"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog"
import { Plus, Edit, Eye, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"
import { Visitor } from "@/types"

interface VisitorModalProps {
  visitor?: Visitor
  mode: 'create' | 'edit' | 'view'
  trigger?: React.ReactNode
  onSave?: (visitor: Visitor) => void
  onDelete?: (visitorId: string) => void
}

export function VisitorModal({ 
  visitor, 
  mode, 
  trigger, 
  onSave, 
  onDelete 
}: VisitorModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Visitor>>(
    visitor || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      visitDetails: {
        hostName: '',
        hostEmail: '',
        department: '',
        purpose: '',
        scheduledTime: new Date(),
        estimatedDuration: 60,
        meetingLocation: '',
        specialRequests: ''
      },
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  )

  const handleSave = () => {
    if (onSave && formData.firstName && formData.lastName && formData.email) {
      const visitorData: Visitor = {
        id: visitor?.id || `v${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        visitDetails: {
          hostName: formData.visitDetails?.hostName || '',
          hostEmail: formData.visitDetails?.hostEmail || '',
          department: formData.visitDetails?.department || '',
          purpose: formData.visitDetails?.purpose || 'Meeting',
          scheduledTime: formData.visitDetails?.scheduledTime || new Date(),
          estimatedDuration: formData.visitDetails?.estimatedDuration || 60,
          meetingLocation: formData.visitDetails?.meetingLocation || '',
          specialRequests: formData.visitDetails?.specialRequests || ''
        },
        status: formData.status || 'scheduled',
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        badgeId: formData.badgeId || `B${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        createdAt: formData.createdAt || new Date(),
        updatedAt: new Date()
      }

      onSave(visitorData)
      setOpen(false)
    }
  }

  const handleDelete = () => {
    if (onDelete && visitor?.id && confirm('Are you sure you want to delete this visitor?')) {
      onDelete(visitor.id)
      setOpen(false)
    }
  }

  const getStatusBadge = (status: Visitor['status']) => {
    const statusConfig = {
      'scheduled': { label: 'Scheduled', icon: Calendar, className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
      'pre-registered': { label: 'Pre-registered', icon: Clock, className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      'checked-in': { label: 'Checked In', icon: CheckCircle, className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      'in-meeting': { label: 'In Meeting', icon: CheckCircle, className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
      'checked-out': { label: 'Checked Out', icon: XCircle, className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' },
      'overdue': { label: 'Overdue', icon: XCircle, className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
    }
    
    const config = statusConfig[status]
    const IconComponent = config.icon
    
    return (
      <Badge className={config.className}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const defaultTrigger = (
    <Button 
      variant={mode === 'create' ? 'default' : mode === 'edit' ? 'outline' : 'ghost'} 
      size={mode === 'create' ? 'default' : 'sm'}
    >
      {mode === 'create' && <Plus className="h-4 w-4 mr-2" />}
      {mode === 'edit' && <Edit className="h-4 w-4 mr-2" />}
      {mode === 'view' && <Eye className="h-4 w-4 mr-2" />}
      {mode === 'create' ? 'Add Visitor' : mode === 'edit' ? 'Edit' : 'View'}
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl">
            {mode === 'create' && 'Register New Visitor'}
            {mode === 'edit' && 'Edit Visitor Information'}
            {mode === 'view' && 'Visitor Details'}
          </DialogTitle>
          <DialogDescription className="text-base">
            {mode === 'create' && 'Fill out the form below to register a new visitor'}
            {mode === 'edit' && 'Update visitor information and status'}
            {mode === 'view' && 'View detailed visitor information'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Status Badge for view/edit mode */}
          {mode !== 'create' && visitor && (
            <div className="flex items-center justify-between p-6 bg-muted/50 rounded-xl border">
              <div className="space-y-2">
                <p className="font-semibold text-lg">Current Status</p>
                {visitor.badgeId && (
                  <p className="text-sm text-muted-foreground">
                    Badge #{visitor.badgeId}
                  </p>
                )}
              </div>
              {getStatusBadge(visitor.status)}
            </div>
          )}
          
          {/* Personal Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold border-b pb-2">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-base font-medium">First Name*</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={mode === 'view'}
                  placeholder="John"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-base font-medium">Last Name*</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={mode === 'view'}
                  placeholder="Doe"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-medium">Email*</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={mode === 'view'}
                  placeholder="john@company.com"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base font-medium">Phone</Label>
                <Input 
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={mode === 'view'}
                  placeholder="+1 (555) 123-4567"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="company" className="text-base font-medium">Company</Label>
              <Input 
                id="company"
                value={formData.company || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                disabled={mode === 'view'}
                placeholder="Acme Corp"
                className="h-12 text-base"
              />
            </div>
          </div>
          
          {/* Visit Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold border-b pb-2">Visit Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="hostName" className="text-base font-medium">Host Name*</Label>
                <Input 
                  id="hostName"
                  value={formData.visitDetails?.hostName || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      hostName: e.target.value 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  placeholder="Alice Johnson"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="hostEmail" className="text-base font-medium">Host Email</Label>
                <Input 
                  id="hostEmail"
                  type="email"
                  value={formData.visitDetails?.hostEmail || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      hostEmail: e.target.value 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  placeholder="alice@company.com"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="department" className="text-base font-medium">Department</Label>
                <Input 
                  id="department"
                  value={formData.visitDetails?.department || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      department: e.target.value 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  placeholder="Sales"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="purpose" className="text-base font-medium">Purpose of Visit*</Label>
                <Input 
                  id="purpose"
                  value={formData.visitDetails?.purpose || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      purpose: e.target.value 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  placeholder="Business meeting"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="scheduledTime" className="text-base font-medium">Scheduled Time</Label>
                <Input 
                  id="scheduledTime"
                  type="datetime-local"
                  value={formData.visitDetails?.scheduledTime ? 
                    new Date(formData.visitDetails.scheduledTime.getTime() - formData.visitDetails.scheduledTime.getTimezoneOffset() * 60000)
                      .toISOString().slice(0, 16) : ''
                  }
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      scheduledTime: new Date(e.target.value) 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="estimatedDuration" className="text-base font-medium">Duration (minutes)</Label>
                <Input 
                  id="estimatedDuration"
                  type="number"
                  value={formData.visitDetails?.estimatedDuration || 60}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    visitDetails: { 
                      ...prev.visitDetails!, 
                      estimatedDuration: parseInt(e.target.value) 
                    } 
                  }))}
                  disabled={mode === 'view'}
                  min="15"
                  max="480"
                  placeholder="60"
                  className="h-12 text-base"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="meetingLocation" className="text-base font-medium">Meeting Location</Label>
              <Input 
                id="meetingLocation"
                value={formData.visitDetails?.meetingLocation || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  visitDetails: { 
                    ...prev.visitDetails!, 
                    meetingLocation: e.target.value 
                  } 
                }))}
                disabled={mode === 'view'}
                placeholder="Conference Room A"
                className="h-12 text-base"
              />
            </div>
            {mode !== 'create' && (
              <div className="space-y-3">
                <Label htmlFor="status" className="text-base font-medium">Status</Label>
                <select 
                  id="status"
                  value={formData.status || 'scheduled'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Visitor['status'] }))}
                  disabled={mode === 'view'}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="pre-registered">Pre-registered</option>
                  <option value="checked-in">Checked In</option>
                  <option value="in-meeting">In Meeting</option>
                  <option value="checked-out">Checked Out</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Timestamps for view mode */}
          {mode === 'view' && visitor && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold border-b pb-2">Timeline</h4>
              <div className="bg-muted/30 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <span className="font-medium text-muted-foreground">Scheduled Time:</span>
                    <span className="font-mono">{visitor.visitDetails.scheduledTime.toLocaleString()}</span>
                  </div>
                  {visitor.checkInTime && (
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <span className="font-medium text-muted-foreground">Check-in Time:</span>
                      <span className="font-mono text-green-600">{visitor.checkInTime.toLocaleString()}</span>
                    </div>
                  )}
                  {visitor.checkOutTime && (
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <span className="font-medium text-muted-foreground">Check-out Time:</span>
                      <span className="font-mono text-red-600">{visitor.checkOutTime.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <span className="font-medium text-muted-foreground">Estimated Duration:</span>
                    <span className="font-mono">{visitor.visitDetails.estimatedDuration} minutes</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
            <div>
              {mode === 'edit' && onDelete && (
                <Button variant="destructive" size="lg" onClick={handleDelete} className="w-full sm:w-auto">
                  Delete Visitor
                </Button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" size="lg" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                {mode === 'view' ? 'Close' : 'Cancel'}
              </Button>
              {mode !== 'view' && (
                <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
                  {mode === 'create' ? 'Register Visitor' : 'Update Visitor'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
