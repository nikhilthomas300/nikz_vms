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
  ArrowLeft,
  Search,
  User,
  Building,
  MapPin,
  RotateCcw,
  Phone
} from "lucide-react"
import { mockVisitors } from "@/lib/data/mockData"

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  }
}

export default function CompactKioskPage() {
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
      month: 'short',
      day: 'numeric'
    })
  }

  const handleQrScan = () => {
    setLoading(true)
    
    setTimeout(() => {
      const visitor = mockVisitors[0]
      setSelectedVisitor(visitor)
      setCurrentStep('confirm')
      setLoading(false)
    }, 1500)
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
    }, 1000)
  }

  const handleVisitorSelect = (visitor: typeof mockVisitors[0]) => {
    setSelectedVisitor(visitor)
    setCurrentStep('confirm')
  }

  const handleCheckIn = () => {
    setLoading(true)
    
    setTimeout(() => {
      setCurrentStep('complete')
      setLoading(false)
    }, 1500)
  }

  const handleStartOver = () => {
    setCurrentStep('welcome')
    setSelectedVisitor(null)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950 flex items-center justify-center p-2">
      <div className="w-full max-w-md">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-3"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <motion.div 
            className="mb-2 p-2 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg border border-white/40 dark:border-slate-700/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-lg font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              {formatDate(currentTime)}
            </div>
          </motion.div>

          <h1 className="text-xl font-bold mb-1 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Check-in
            </span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Choose an option below
          </p>
        </motion.div>

        {loading && <GlobalLoader isLoading={loading} />}

        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-3"
            >
              {/* QR Code Check-in */}
              <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white/90 to-blue-50/70 dark:from-slate-800/90 dark:to-blue-950/50 border border-blue-200/50">
                  <CardContent className="p-4 text-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <QrCode className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-sm font-bold mb-1">QR Code</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                      Scan your QR code
                    </p>
                    <Button 
                      size="sm"
                      onClick={handleQrScan}
                      className="w-full h-8 bg-gradient-to-r from-blue-600 to-blue-700 text-xs"
                    >
                      <QrCode className="mr-1 h-3 w-3" />
                      Scan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Manual Search */}
              <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white/90 to-green-50/70 dark:from-slate-800/90 dark:to-green-950/50 border border-green-200/50">
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Search className="h-4 w-4 text-green-600 dark:text-green-300" />
                      </div>
                      <h3 className="text-sm font-bold mb-1">Manual Search</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Search by name or company
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Name, company, or phone..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-7 pr-2 py-2 text-xs border border-slate-200 dark:border-slate-600 rounded-md focus:border-green-500 bg-white/80 dark:bg-slate-700/80"
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <Button 
                        size="sm"
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                        className="w-full h-8 bg-gradient-to-r from-green-600 to-green-700 text-xs disabled:opacity-50"
                      >
                        <Search className="mr-1 h-3 w-3" />
                        Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Help */}
              <motion.div variants={itemVariants}>
                <Card className="bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/50">
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Phone className="mr-1 h-3 w-3" />
                        Help
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Home className="mr-1 h-3 w-3" />
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
            >
              <motion.div variants={itemVariants} className="mb-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleStartOver}
                  className="mb-2 h-7 text-xs"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back
                </Button>
                <h2 className="text-lg font-bold mb-1">Results</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {searchResults.length} found for &quot;{searchQuery}&quot;
                </p>
              </motion.div>

              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((visitor, index) => (
                    <motion.div
                      key={visitor.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white/90 dark:bg-slate-800/90"
                        onClick={() => handleVisitorSelect(visitor)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-8 h-8 bg-blue-100 dark:bg-blue-800">
                                <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                              </Avatar>
                              <div className="min-w-0">
                                <h3 className="text-sm font-semibold truncate">
                                  {visitor.firstName} {visitor.lastName}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                                  {visitor.company}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium">
                                {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              <Badge className="text-xs bg-blue-100 text-blue-800">
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
                  <Card className="text-center p-4 bg-white/80 dark:bg-slate-800/80">
                    <CardContent>
                      <Search className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <h3 className="text-sm font-semibold mb-1">Not Found</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                        No appointments found. Try again or call reception.
                      </p>
                      <div className="space-y-2">
                        <Button onClick={handleStartOver} size="sm" className="w-full h-7 text-xs">
                          <RotateCcw className="mr-1 h-3 w-3" />
                          Try Again
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
            >
              <motion.div variants={itemVariants} className="mb-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleStartOver}
                  className="mb-2 h-7 text-xs"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back
                </Button>
                <h2 className="text-lg font-bold mb-1">Confirm</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Verify your details
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-white/90 dark:bg-slate-800/90">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-10 h-10 bg-blue-100 dark:bg-blue-800">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold mb-1">
                          {selectedVisitor.firstName} {selectedVisitor.lastName}
                        </h3>
                        <div className="space-y-1">
                          <p className="flex items-center text-xs">
                            <Building className="h-3 w-3 mr-1 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{selectedVisitor.company}</span>
                          </p>
                          <p className="flex items-center text-xs">
                            <Phone className="h-3 w-3 mr-1 text-slate-400 flex-shrink-0" />
                            {selectedVisitor.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-slate-500">Host</label>
                          <p className="font-medium">{selectedVisitor.visitDetails.hostName}</p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Purpose</label>
                          <p className="font-medium">{selectedVisitor.visitDetails.purpose}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-slate-500">Time</label>
                          <p className="font-medium">
                            {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Duration</label>
                          <p className="font-medium">{selectedVisitor.visitDetails.estimatedDuration}m</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      size="sm"
                      onClick={handleCheckIn}
                      className="w-full h-9 bg-gradient-to-r from-green-600 to-green-700 text-xs"
                    >
                      <UserCheck className="mr-1 h-3 w-3" />
                      Check In
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
              className="text-center"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border border-green-200/50">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    
                    <h2 className="text-lg font-bold text-green-800 dark:text-green-200 mb-1">
                      Welcome!
                    </h2>
                    <p className="text-xs text-green-700 dark:text-green-300 mb-3">
                      Successfully checked in, {selectedVisitor.firstName}!
                    </p>

                    <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 mb-3">
                      <h3 className="font-semibold text-xs mb-2">Badge</h3>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded text-center">
                        <p className="text-xs font-bold">VISITOR</p>
                        <p className="text-xs">{selectedVisitor.firstName} {selectedVisitor.lastName}</p>
                        <p className="text-xs opacity-90">{selectedVisitor.company}</p>
                      </div>
                    </div>

                    <div className="space-y-1 mb-3 text-xs">
                      <div className="flex justify-between p-2 bg-white/60 dark:bg-slate-700/60 rounded">
                        <span>Host:</span>
                        <span>{selectedVisitor.visitDetails.hostName}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white/60 dark:bg-slate-700/60 rounded">
                        <span>Time:</span>
                        <span>{formatTime(currentTime)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button size="sm" className="w-full h-8 bg-blue-600 text-xs">
                        <Printer className="mr-1 h-3 w-3" />
                        Print
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <MapPin className="mr-1 h-3 w-3" />
                          Map
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleStartOver}
                          className="h-8 text-xs"
                        >
                          <RotateCcw className="mr-1 h-3 w-3" />
                          New
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
