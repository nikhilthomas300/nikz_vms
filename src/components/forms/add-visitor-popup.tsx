"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  UserPlus,
  Mail,
  Phone,
  Building2,
  Wifi,
  Save,
  X
} from "lucide-react"
import { Visitor } from "@/types"

interface AddVisitorPopupProps {
  isOpen: boolean
  onClose: () => void
  onAddVisitor: (visitor: Partial<Visitor>) => void
  meetingId: string
}

export function AddVisitorPopup({ isOpen, onClose, onAddVisitor, meetingId }: AddVisitorPopupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    wifiRequired: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const visitorData: Partial<Visitor> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        wifiRequired: formData.wifiRequired,
        meetingId: meetingId,
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
        scheduledTime: new Date(), // This should be set from meeting time
        visitDetails: {
          employeeName: "", // This should be set from meeting employee
          employeeEmail: "", // This should be set from meeting employee  
          department: "",
          purpose: "Meeting attendance",
          scheduledTime: new Date(),
          estimatedDuration: 60
        }
      }

      await onAddVisitor(visitorData)
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        wifiRequired: false
      })
      
      onClose()
    } catch (error) {
      console.error("Error adding visitor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      wifiRequired: false
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            Add Visitor to Meeting
          </DialogTitle>
          <DialogDescription>
            Fill out the visitor information to add them to this meeting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="John"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Smith"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john.smith@company.com"
                className="pl-10"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Mobile Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1-555-0123"
                className="pl-10"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company Name
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="TechCorp Inc."
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* WiFi Required */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">WiFi Access</Label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wifi"
                  checked={formData.wifiRequired === true}
                  onChange={() => setFormData(prev => ({ ...prev, wifiRequired: true }))}
                  disabled={isSubmitting}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-sm">WiFi Required</span>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wifi"
                  checked={formData.wifiRequired === false}
                  onChange={() => setFormData(prev => ({ ...prev, wifiRequired: false }))}
                  disabled={isSubmitting}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">No WiFi Needed</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Adding..." : "Add Visitor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}