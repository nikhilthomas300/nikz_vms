"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { GlobalLoader } from "@/components/ui/global-loader"
import { 
  QrCode, 
  UserCheck, 
  Clock, 
  CheckCircle,
  Printer,
  Home,
  ArrowRight,
  Search,
  User,
  Building,
  Calendar,
  Timer,
  MapPin
} from "lucide-react"
import { mockVisitors } from "@/lib/data/mockData"

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
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

export default function KioskPage() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'search' | 'confirm' | 'complete'>('welcome')
  const [selectedVisitor, setSelectedVisitor] = useState<typeof mockVisitors[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockVisitors>([])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleQrScan = () => {
    setLoading(true)
    
    // Simulate QR scan
    setTimeout(() => {
      const visitor = mockVisitors[0]
      setSelectedVisitor(visitor)
      setCurrentStep('confirm')
      setLoading(false)
    }, 2000)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setCurrentStep('search')
    
    setTimeout(() => {
      const results = mockVisitors.filter(visitor => {
        const fullName = `${visitor.firstName} ${visitor.lastName}`
        return fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               visitor.phone?.includes(searchQuery) ||
               visitor.email?.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setSearchResults(results)
      setLoading(false)
    }, 1000)
  }

  const handleSelectVisitor = (visitor: typeof mockVisitors[0]) => {
    setSelectedVisitor(visitor)
    setCurrentStep('confirm')
  }

  const handleCheckIn = () => {
    setLoading(true)
    
    setTimeout(() => {
      setCurrentStep('complete')
      setLoading(false)
    }, 2000)
  }

  const resetKiosk = () => {
    setCurrentStep('welcome')
    setSelectedVisitor(null)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <>
      <GlobalLoader isLoading={loading} text="Processing..." />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCheck className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome
                  </h1>
                  <p className="text-sm lg:text-lg text-slate-600 dark:text-slate-300">Visitor Check-in Kiosk</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <div className="text-center lg:text-right">
                  <div className="flex items-center gap-2 text-lg lg:text-xl font-mono font-semibold">
                    <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-xs lg:text-sm">
                    {currentTime.toLocaleDateString([], { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-6 lg:py-8">
          <AnimatePresence mode="wait">
            {/* Welcome Screen */}
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center pb-6 lg:pb-8">
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Ready to Check In?
                      </CardTitle>
                      <p className="text-lg lg:text-xl text-muted-foreground">
                        Choose your preferred check-in method below
                      </p>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="pb-8 lg:pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                      <motion.div variants={itemVariants}>
                        <Button
                          size="lg"
                          className="w-full h-32 lg:h-48 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-base lg:text-lg"
                          onClick={handleQrScan}
                        >
                          <div className="flex flex-col items-center gap-3 lg:gap-4">
                            <QrCode className="h-12 w-12 lg:h-16 lg:w-16 group-hover:scale-110 transition-transform duration-300" />
                            <div className="text-center">
                              <div className="font-bold">Scan QR Code</div>
                              <div className="text-blue-100 text-sm lg:text-base">Quick & Secure</div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Button
                          size="lg"
                          className="w-full h-32 lg:h-48 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-base lg:text-lg"
                          onClick={() => setCurrentStep('search')}
                        >
                          <div className="flex flex-col items-center gap-3 lg:gap-4">
                            <Search className="h-12 w-12 lg:h-16 lg:w-16 group-hover:scale-110 transition-transform duration-300" />
                            <div className="text-center">
                              <div className="font-bold">Search Visit</div>
                              <div className="text-purple-100 text-sm lg:text-base">Find by Name</div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants} className="text-center">
                      <Button 
                        variant="ghost" 
                        size="lg"
                        onClick={() => window.location.href = '/'}
                        className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-base lg:text-lg"
                      >
                        <Home className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                        Return to Home
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Search Screen */}
            {currentStep === 'search' && (
              <motion.div
                key="search"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center">
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-2xl lg:text-3xl font-bold mb-4">Find Your Visit</CardTitle>
                      <p className="text-base lg:text-lg text-muted-foreground">
                        Enter your name, company, or email address
                      </p>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 lg:space-y-8">
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          placeholder="Enter your name, company, or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-14 text-lg"
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <Button 
                        size="lg" 
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                        className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Search
                      </Button>
                    </motion.div>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold">Select Your Visit:</h3>
                        <div className="grid gap-4">
                          {searchResults.map((visitor, index) => (
                            <motion.div
                              key={visitor.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-blue-200" 
                                    onClick={() => handleSelectVisitor(visitor)}>
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                    {visitor.firstName[0]}{visitor.lastName[0]}
                                  </Avatar>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg">{visitor.firstName} {visitor.lastName}</h4>
                                    <div className="text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Building className="h-3 w-3" />
                                        {visitor.company} • Meeting with {visitor.visitDetails.hostName}
                                      </div>
                                      <div className="flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()} at {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </div>
                                    </div>
                                  </div>
                                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* No Results */}
                    {searchQuery && searchResults.length === 0 && (
                      <motion.div variants={itemVariants} className="text-center py-8">
                        <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Visits Found</h3>
                        <p className="text-muted-foreground mb-4">
                          We couldn&apos;t find any scheduled visits matching your search.
                        </p>
                        <Button variant="outline" onClick={() => setSearchQuery('')}>
                          Clear Search
                        </Button>
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => setCurrentStep('welcome')}
                        className="flex-1"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                        Back
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Confirm Screen */}
            {currentStep === 'confirm' && selectedVisitor && (
              <motion.div
                key="confirm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-3xl mx-auto"
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader className="text-center">
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-2xl lg:text-3xl font-bold mb-4">Confirm Your Visit</CardTitle>
                      <p className="text-base lg:text-lg text-muted-foreground">
                        Please review your visit details
                      </p>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 lg:space-y-8">
                    <motion.div variants={itemVariants} className="text-center">
                      <Avatar className="h-20 w-20 lg:h-24 lg:w-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                        {selectedVisitor.firstName[0]}{selectedVisitor.lastName[0]}
                      </Avatar>
                      <h3 className="text-xl lg:text-2xl font-bold mb-2">{selectedVisitor.firstName} {selectedVisitor.lastName}</h3>
                      <Badge className="bg-blue-100 text-blue-800 text-base">
                        {selectedVisitor.company}
                      </Badge>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Meeting with</p>
                            <p className="text-base lg:text-lg">{selectedVisitor.visitDetails.hostName}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Department</p>
                            <p className="text-base lg:text-lg">{selectedVisitor.visitDetails.department}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Purpose</p>
                            <p className="text-base lg:text-lg">{selectedVisitor.visitDetails.purpose}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                            <p className="text-base lg:text-lg">
                              {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleDateString()}
                            </p>
                            <p className="text-base lg:text-lg">
                              {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Timer className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Duration</p>
                            <p className="text-base lg:text-lg">{selectedVisitor.visitDetails.estimatedDuration} minutes</p>
                          </div>
                        </div>
                        {selectedVisitor.visitDetails.meetingLocation && (
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Location</p>
                              <p className="text-base lg:text-lg">{selectedVisitor.visitDetails.meetingLocation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-4 pt-6">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => setCurrentStep(searchResults.length > 0 ? 'search' : 'welcome')}
                        className="flex-1"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                        Back
                      </Button>
                      <Button 
                        size="lg" 
                        onClick={handleCheckIn}
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Check In
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Complete Screen */}
            {currentStep === 'complete' && selectedVisitor && (
              <motion.div
                key="complete"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-3xl mx-auto"
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl text-center">
                  <CardContent className="p-8 lg:p-12">
                    <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
                      <div className="flex justify-center">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                          Welcome, {selectedVisitor.firstName}!
                        </h2>
                        <p className="text-lg lg:text-xl text-muted-foreground mb-4">
                          You have been successfully checked in.
                        </p>
                        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 lg:p-6">
                          <p className="text-sm lg:text-base text-green-800 dark:text-green-200">
                            <strong>{selectedVisitor.visitDetails.hostName}</strong> has been notified of your arrival.
                            {selectedVisitor.visitDetails.meetingLocation && (
                              <> Please proceed to <strong>{selectedVisitor.visitDetails.meetingLocation}</strong>.</>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="text-base lg:text-lg"
                        >
                          <Printer className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                          Print Badge
                        </Button>
                        <Button 
                          size="lg" 
                          onClick={resetKiosk}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base lg:text-lg"
                        >
                          <Home className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                          Finish
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Thank you for using our visitor management system!
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
