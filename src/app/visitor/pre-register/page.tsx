"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  UserPlus, 
  Calendar, 
  Clock, 
  Building,
  User,
  CheckCircle,
  FileText
} from "lucide-react"
import { GlobalLoader } from "@/components/ui/global-loader"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

export default function VisitorPreRegisterPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    hostName: '',
    hostEmail: '',
    purpose: '',
    visitDate: '',
    visitTime: '',
    estimatedDuration: '60',
    specialRequests: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      hostName: '',
      hostEmail: '',
      purpose: '',
      visitDate: '',
      visitTime: '',
      estimatedDuration: '60',
      specialRequests: ''
    })
  }

  return (
    <MainLayout role="visitor" title="Pre-register for Visit" subtitle="Schedule your visit in advance">
      <GlobalLoader isLoading={loading} text="Submitting your registration..." />
      
      <div className="p-4 lg:p-6">
        {!submitted ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Schedule Your Visit</h2>
                      <p className="text-sm text-muted-foreground">Fill out the form below to register for your visit</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <p className="text-xs font-medium">Personal Info</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <p className="text-xs font-medium">Visit Details</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-1">
                        <span className="text-gray-600 dark:text-gray-300 text-sm font-bold">3</span>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">Confirmation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Form */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Visit Details */}
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Visit Details</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hostName">Host Name *</Label>
                          <Input
                            id="hostName"
                            name="hostName"
                            value={formData.hostName}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="hostEmail">Host Email</Label>
                          <Input
                            id="hostEmail"
                            name="hostEmail"
                            type="email"
                            value={formData.hostEmail}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="visitDate">Visit Date *</Label>
                          <Input
                            id="visitDate"
                            name="visitDate"
                            type="date"
                            value={formData.visitDate}
                            onChange={handleChange}
                            required
                            className="mt-1"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="visitTime">Visit Time *</Label>
                          <Input
                            id="visitTime"
                            name="visitTime"
                            type="time"
                            value={formData.visitTime}
                            onChange={handleChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="estimatedDuration">Estimated Duration (minutes)</Label>
                          <select
                            id="estimatedDuration"
                            name="estimatedDuration"
                            value={formData.estimatedDuration}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                            <option value="180">3 hours</option>
                            <option value="240">4+ hours</option>
                          </select>
                        </div>
                        
                        <div>
                          <Label htmlFor="purpose">Purpose of Visit *</Label>
                          <Input
                            id="purpose"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            required
                            className="mt-1"
                            placeholder="e.g., Business meeting, Interview, Consultation"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                          <textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[80px]"
                            placeholder="Any special requirements, accessibility needs, or additional information..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div className="border-t pt-6">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="submit"
                          className="flex-1 sm:flex-none sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2"
                        >
                          <UserPlus className="h-4 w-4" />
                          Submit Registration
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetForm}
                          className="flex-1 sm:flex-none sm:px-8"
                        >
                          Reset Form
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-3">
                        By submitting this form, you agree to our visitor policies and consent to data processing for visit management purposes.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ) : (
          /* Success Message */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <CardContent className="p-8">
                <motion.div variants={itemVariants}>
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                    Registration Successful!
                  </h2>
                  <p className="text-green-700 dark:text-green-300 mb-6">
                    Your visit has been registered successfully. You will receive a confirmation email shortly.
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-700">
                    <h3 className="font-semibold mb-2">Visit Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{formData.hostName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formData.visitDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formData.visitTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={resetForm} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Register Another Visit
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      View My Visits
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
