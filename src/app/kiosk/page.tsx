"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { GlobalLoader } from "@/components/ui/global-loader"
import { 
  QrCode, 
  UserCheck, 
  CheckCircle,
  Printer,
  Home,
  ArrowRight,
  Search,
  User,
  Building,
  MapPin,
  RotateCcw,
  Phone,
  Mail,
  Camera
} from "lucide-react"
import { mockVisitors } from "@/lib/data/mockData"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

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
        const fullName = `${visitor.firstName} ${visitor.lastName}`.toLowerCase()
        const company = visitor.company?.toLowerCase() || ''
        const phone = visitor.phone.toLowerCase()
        const query = searchQuery.toLowerCase()
        
        return fullName.includes(query) || company.includes(query) || phone.includes(query)
      })
      
      setSearchResults(results)
      setLoading(false)
    }, 1500)
  }

  const handleVisitorSelect = (visitor: typeof mockVisitors[0]) => {
    setSelectedVisitor(visitor)
    setCurrentStep('confirm')
  }

  const handleCheckIn = () => {
    setLoading(true)
    
    // Simulate check-in process
    setTimeout(() => {
      setCurrentStep('complete')
      setLoading(false)
    }, 2000)
  }

  const handleStartOver = () => {
    setCurrentStep('welcome')
    setSelectedVisitor(null)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-1 sm:p-2 md:p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
            </div>
          </div>
          
          {/* Digital Clock */}
          <motion.div 
            className="mb-2 sm:mb-3 p-1.5 sm:p-2 md:p-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/30 dark:border-slate-700/30 max-w-48 sm:max-w-xs md:max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-lg sm:text-xl md:text-2xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {formatDate(currentTime)}
            </div>
          </motion.div>

          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Check-in
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2">
            Choose an option to check in
          </p>
        </motion.div>

        {loading && <GlobalLoader isLoading={false} />}

        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-full md:max-w-3xl lg:max-w-4xl mx-auto">
                {/* QR Code Check-in */}
                <motion.div variants={itemVariants}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white/90 to-blue-50/70 dark:from-slate-800/90 dark:to-blue-950/50 border border-blue-200/50 hover:border-blue-400/70 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <QrCode className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-300" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                        QR Code
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                        Scan your QR code for instant check-in.
                      </p>
                      <div className="space-y-1 sm:space-y-2">
                        <Button 
                          size="sm"
                          onClick={handleQrScan}
                          className="w-full h-8 sm:h-9 md:h-10 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-xs sm:text-sm md:text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300 rounded-md sm:rounded-lg"
                        >
                          <QrCode className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          Scan
                        </Button>
                        <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          <span>Camera required</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Manual Search */}
                <motion.div variants={itemVariants}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white/90 to-green-50/70 dark:from-slate-800/90 dark:to-green-950/50 border border-green-200/50 hover:border-green-400/70 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <div className="text-center mb-2 sm:mb-3 md:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-105 transition-all duration-300 shadow-sm">
                          <Search className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-300" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 group-hover:text-green-600 transition-colors">
                          Manual Search
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                          Search by name, company, or phone.
                        </p>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="relative">
                          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Enter name, company, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-7 sm:pl-9 pr-2 sm:pr-3 py-2 sm:py-3 text-xs sm:text-sm border border-slate-200 dark:border-slate-600 rounded-md sm:rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          />
                        </div>
                        <Button 
                          size="sm"
                          onClick={handleSearch}
                          disabled={!searchQuery.trim()}
                          className="w-full h-8 sm:h-9 md:h-10 lg:h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xs sm:text-sm md:text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md sm:rounded-lg"
                        >
                          <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          Search
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Help Section */}
              <motion.div variants={itemVariants}>
                <Card className="max-w-full md:max-w-2xl lg:max-w-3xl mx-auto bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 shadow-sm">
                  <CardContent className="p-2 sm:p-3 md:p-4">
                    <div className="text-center">
                      <h4 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-slate-800 dark:text-slate-200">
                        Need Help?
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 md:gap-3">
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 md:h-10 lg:h-12 border hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-300 text-xs sm:text-sm">
                          <Phone className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">Call</span>
                          <span className="sm:hidden">📞</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 md:h-10 lg:h-12 border hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all duration-300 text-xs sm:text-sm">
                          <User className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">Walk-in</span>
                          <span className="sm:hidden">👤</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 md:h-10 lg:h-12 border hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 transition-all duration-300 text-xs sm:text-sm">
                          <Building className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">Directory</span>
                          <span className="sm:hidden">🏢</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 md:h-10 lg:h-12 border hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all duration-300 text-xs sm:text-sm">
                          <MapPin className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          <span className="hidden sm:inline">Map</span>
                          <span className="sm:hidden">🗺️</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Footer */}
              <motion.div variants={itemVariants} className="text-center">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100">
                    <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Home
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Search Results Step */}
          {currentStep === 'search' && (
            <motion.div
              key="search"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleStartOver}
                  className="mb-3"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Search Results</h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  Found {searchResults.length} appointment(s) for &quot;{searchQuery}&quot;
                </p>
              </motion.div>

              {searchResults.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {searchResults.map((visitor, index) => (
                    <motion.div
                      key={visitor.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
                        onClick={() => handleVisitorSelect(visitor)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700">
                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-300" />
                              </Avatar>
                              <div>
                                <h3 className="text-base sm:text-lg font-semibold">
                                  {visitor.firstName} {visitor.lastName}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                  {visitor.company} • {visitor.phone}
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                  {visitor.visitDetails.purpose}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                Time
                              </p>
                              <p className="text-sm font-semibold">
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              <Badge className="mt-1 text-xs bg-blue-100 text-blue-800">
                                {visitor.visitDetails.hostName}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div variants={itemVariants}>
                  <Card className="text-center p-6 sm:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardContent>
                      <Search className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                      <h3 className="text-lg font-semibold mb-2">No Appointments Found</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        No appointments found for your search. Please try again or contact reception.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                        <Button onClick={handleStartOver} size="sm">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Try Again
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Reception
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirm' && selectedVisitor && (
            <motion.div
              key="confirm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-2xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleStartOver}
                  className="mb-3"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Confirm Details</h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  Please verify your information
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                      <Avatar className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700">
                        <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-300" />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                          {selectedVisitor.firstName} {selectedVisitor.lastName}
                        </h3>
                        <div className="space-y-1 text-sm sm:text-base">
                          <p className="flex items-center">
                            <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{selectedVisitor.company}</span>
                          </p>
                          <p className="flex items-center">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-slate-400 flex-shrink-0" />
                            {selectedVisitor.phone}
                          </p>
                          <p className="flex items-center">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{selectedVisitor.email}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                          Visit Details
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Host</label>
                            <p className="font-medium text-sm">{selectedVisitor.visitDetails.hostName}</p>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Department</label>
                            <p className="font-medium text-sm">{selectedVisitor.visitDetails.department}</p>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Purpose</label>
                            <p className="font-medium text-sm">{selectedVisitor.visitDetails.purpose}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                          Schedule
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Date</label>
                            <p className="font-medium text-sm">
                              {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Time</label>
                            <p className="font-medium text-sm">
                              {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 dark:text-slate-400">Duration</label>
                            <p className="font-medium text-sm">{selectedVisitor.visitDetails.estimatedDuration} min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      size="sm"
                      onClick={handleCheckIn}
                      className="w-full h-10 sm:h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-sm sm:text-base font-semibold shadow-sm"
                    >
                      <UserCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Confirm Check-in
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Complete Step */}
          {currentStep === 'complete' && selectedVisitor && (
            <motion.div
              key="complete"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border border-green-200/50 shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200 mb-2 sm:mb-3">
                      Welcome!
                    </h2>
                    <p className="text-sm sm:text-lg text-green-700 dark:text-green-300 mb-4 sm:mb-6">
                      You have successfully checked in, {selectedVisitor.firstName}!
                    </p>

                    <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <h3 className="font-semibold text-sm sm:text-base mb-3">Your Visitor Badge</h3>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-lg">
                        <div className="text-center">
                          <p className="text-lg sm:text-xl font-bold mb-1">VISITOR</p>
                          <p className="text-sm sm:text-base">{selectedVisitor.firstName} {selectedVisitor.lastName}</p>
                          <p className="text-xs opacity-90">{selectedVisitor.company}</p>
                          <p className="text-xs mt-1">Badge ID: V{Date.now().toString().slice(-4)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 sm:mb-6">
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg text-sm">
                        <span className="font-medium">Host:</span>
                        <span>{selectedVisitor.visitDetails.hostName}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg text-sm">
                        <span className="font-medium">Location:</span>
                        <span>{selectedVisitor.visitDetails.meetingLocation || 'Reception will direct you'}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg text-sm">
                        <span className="font-medium">Check-in:</span>
                        <span>{formatTime(currentTime)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <Button size="sm" className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-sm sm:text-base">
                        <Printer className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Print Badge
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Button variant="outline" size="sm" className="h-10 text-xs sm:text-sm">
                          <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          View Map
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleStartOver}
                          className="h-10 text-xs sm:text-sm"
                        >
                          <RotateCcw className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          New Check-in
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
