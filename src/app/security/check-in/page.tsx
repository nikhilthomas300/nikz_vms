/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { 
  UserCheck, 
  Search, 
  QrCode,
  Clock,
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react"
import { GlobalLoader } from "@/components/ui/global-loader"
import { mockVisitors } from "@/lib/data/mockData"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function SecurityCheckinPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setTimeout(() => {
      const results = mockVisitors.filter(visitor => {
        const name = visitor.name || `${visitor.firstName} ${visitor.lastName}`
        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               visitor.phone?.includes(searchQuery) ||
               visitor.email?.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setSearchResults(results)
      setLoading(false)
    }, 800)
  }

  const handleCheckIn = async (visitor: any) => {
    setChecking(true)
    setSelectedVisitor(visitor)
    
    // Simulate check-in process
    setTimeout(() => {
      // Update visitor status
      const updatedResults = searchResults.map(v => 
        v.id === visitor.id ? { ...v, status: 'checked-in' as const, checkedInAt: new Date() } : v
      )
      setSearchResults(updatedResults)
      setChecking(false)
      setSelectedVisitor(null)
      const visitorName = visitor.name || `${visitor.firstName} ${visitor.lastName}`
      alert(`${visitorName} has been checked in successfully!`)
    }, 2000)
  }

  const handleCheckOut = async (visitor: any) => {
    setChecking(true)
    setSelectedVisitor(visitor)
    
    // Simulate check-out process
    setTimeout(() => {
      const updatedResults = searchResults.map(v => 
        v.id === visitor.id ? { ...v, status: 'checked-out' as const, checkedOutAt: new Date() } : v
      )
      setSearchResults(updatedResults)
      setChecking(false)
      setSelectedVisitor(null)
      const visitorName = visitor.name || `${visitor.firstName} ${visitor.lastName}`
      alert(`${visitorName} has been checked out successfully!`)
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <MainLayout role="security" title="Visitor Check-in">
      <GlobalLoader isLoading={loading} text="Loading check-in system..." />
      <GlobalLoader isLoading={checking} text={`Processing ${selectedVisitor ? `${selectedVisitor.firstName} ${selectedVisitor.lastName}` : 'visitor'}...`} />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Visitor Check-in</h1>
                <p className="text-muted-foreground">Manage visitor arrivals and departures</p>
              </div>
            </div>
          </motion.div>

          {/* Search Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Visitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name, company, phone, or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                    Search
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => {/* QR scan functionality */}}
                  >
                    <QrCode className="h-8 w-8" />
                    <span>Scan QR Code</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => {/* Walk-in registration */}}
                  >
                    <User className="h-8 w-8" />
                    <span>Walk-in Registration</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Search Results ({searchResults.length})</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map((visitor, index) => (
                  <motion.div
                    key={visitor.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                              {visitor.firstName[0]}{visitor.lastName[0]}
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{visitor.firstName} {visitor.lastName}</h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building className="h-3 w-3" />
                                {visitor.company}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(visitor.status)}
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Visit Date: {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Time: {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString()}</span>
                          </div>
                          {visitor.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{visitor.phone}</span>
                            </div>
                          )}
                          {visitor.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate">{visitor.email}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {visitor.status === 'scheduled' && (
                            <Button 
                              className="flex-1" 
                              onClick={() => handleCheckIn(visitor)}
                              disabled={checking}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Check In
                            </Button>
                          )}
                          {visitor.status === 'checked-in' && (
                            <Button 
                              variant="outline" 
                              className="flex-1" 
                              onClick={() => handleCheckOut(visitor)}
                              disabled={checking}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Check Out
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {searchQuery && searchResults.length === 0 && !loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Search className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Visitors Found</h3>
              <p className="text-muted-foreground">
                No visitors found matching &ldquo;{searchQuery}&rdquo;. Try a different search term.
              </p>
            </motion.div>
          )}

          {/* Instructions */}
          {!searchQuery && searchResults.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <UserCheck className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready for Check-in</h3>
              <p className="text-muted-foreground mb-4">
                Search for a visitor by name, company, phone, or email to begin the check-in process.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-muted-foreground">
                <span>Quick actions:</span>
                <div className="flex gap-2">
                  <Badge variant="outline">Search Visitor</Badge>
                  <Badge variant="outline">Scan QR</Badge>
                  <Badge variant="outline">Walk-in</Badge>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
