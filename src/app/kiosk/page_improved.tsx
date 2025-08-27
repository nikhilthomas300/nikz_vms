"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Removed unused import
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
  MapPin,
  RotateCcw
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
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        {/* Compact Professional Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <UserCheck className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Visitor Check-in
                  </h1>
                  <p className="text-xs lg:text-sm text-muted-foreground">Professional Kiosk System</p>
                </div>
              </div>
              
              {/* Digital Clock */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg lg:text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(currentTime)}
                  </div>
                </div>
                
                {/* Home Button */}
                <Link href="/">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            {/* Welcome Screen */}
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome!</h2>
                  <p className="text-muted-foreground">Choose your check-in method</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* QR Code Check-in */}
                  <motion.div variants={itemVariants}>
                    <Card className="h-full group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-md">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <QrCode className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">QR Code Check-in</h3>
                        <p className="text-muted-foreground mb-4">Scan your invitation QR code</p>
                        <Button 
                          onClick={handleQrScan}
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        >
                          Start QR Scan
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Manual Search */}
                  <motion.div variants={itemVariants}>
                    <Card className="h-full group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Search className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center">Manual Check-in</h3>
                        <p className="text-muted-foreground mb-4 text-center">Search by name or details</p>
                        <div className="space-y-3">
                          <Input
                            placeholder="Enter your name or company..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          />
                          <Button 
                            onClick={handleSearch}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            disabled={!searchQuery.trim()}
                          >
                            Search Visitors
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Search Results */}
            {currentStep === 'search' && (
              <motion.div
                key="search"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold">Search Results</h2>
                    <p className="text-muted-foreground">Found {searchResults.length} visitor(s)</p>
                  </div>
                  <Button variant="outline" onClick={() => setCurrentStep('welcome')}>
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Back
                  </Button>
                </div>

                {searchResults.length === 0 ? (
                  <Card className="text-center p-8">
                    <p className="text-muted-foreground mb-4">No visitors found matching your search.</p>
                    <Button onClick={() => setCurrentStep('welcome')}>
                      Try Again
                    </Button>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {searchResults.map((visitor) => (
                      <motion.div key={visitor.id} variants={itemVariants}>
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                          onClick={() => handleSelectVisitor(visitor)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                  {visitor.firstName[0]}{visitor.lastName[0]}
                                </div>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">{visitor.firstName} {visitor.lastName}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  {visitor.company && (
                                    <div className="flex items-center gap-1">
                                      <Building className="h-3 w-3" />
                                      {visitor.company}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Confirmation Screen */}
            {currentStep === 'confirm' && selectedVisitor && (
              <motion.div
                key="confirm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Confirm Check-in</h2>
                  <p className="text-muted-foreground">Please verify your information</p>
                </div>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6 mb-6">
                      <Avatar className="w-20 h-20">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                          {selectedVisitor.firstName[0]}{selectedVisitor.lastName[0]}
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedVisitor.firstName} {selectedVisitor.lastName}</h3>
                        <p className="text-muted-foreground">{selectedVisitor.email}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="font-medium">{selectedVisitor.company || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Host</p>
                            <p className="font-medium">{selectedVisitor.visitDetails.hostName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Scheduled Time</p>
                            <p className="font-medium">
                              {new Date(selectedVisitor.visitDetails.scheduledTime).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Purpose</p>
                            <p className="font-medium">{selectedVisitor.visitDetails.purpose}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep('welcome')}
                        className="flex-1"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCheckIn}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Check In
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Success Screen */}
            {currentStep === 'complete' && selectedVisitor && (
              <motion.div
                key="complete"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-2 text-green-600">Welcome!</h2>
                  <p className="text-xl mb-4">Check-in successful for</p>
                  <p className="text-2xl font-bold">{selectedVisitor.firstName} {selectedVisitor.lastName}</p>
                </div>

                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Check-in Time</p>
                        <p className="font-medium">{formatTime(currentTime)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Your Host</p>
                        <p className="font-medium">{selectedVisitor.visitDetails.hostName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={resetKiosk}
                    className="flex-1"
                  >
                    <User className="h-4 w-4 mr-2" />
                    New Check-in
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => window.print()}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Badge
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
