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
  Users, 
  Search, 
  Clock, 
  MapPin,
  User,
  Building,
  Phone,
  Eye,
  CheckCircle,
  AlertTriangle,
  Timer
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

export default function SecurityActiveVisitorsPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeVisitors, setActiveVisitors] = useState<typeof mockVisitors>([])

  useEffect(() => {
    setTimeout(() => {
      // Filter only checked-in visitors
      const active = mockVisitors.filter(visitor => visitor.status === 'checked-in')
      setActiveVisitors(active)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredVisitors = activeVisitors.filter(visitor => {
    const fullName = `${visitor.firstName} ${visitor.lastName}`
    return fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           visitor.visitDetails.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const getTimeInBuilding = (checkInTime?: Date) => {
    if (!checkInTime) return "Just arrived"
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - checkInTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}h ${minutes}m`
  }

  return (
    <MainLayout role="security" title="Active Visitors" subtitle="Monitor all currently checked-in visitors">
      <GlobalLoader isLoading={loading} text="Loading active visitors..." />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-end">
              <Badge variant="outline" className="text-lg px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {activeVisitors.length} Active
              </Badge>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search active visitors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Visitors Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVisitors.map((visitor, index) => (
              <motion.div
                key={visitor.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold">
                          {visitor.firstName[0]}{visitor.lastName[0]}
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{visitor.firstName} {visitor.lastName}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building className="h-3 w-3" />
                            {visitor.company}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Host:</span>
                        <span>{visitor.visitDetails.employeeName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Department:</span>
                        <span>{visitor.visitDetails.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Checked in:</span>
                        <span>{getTimeInBuilding(visitor.checkInTime)} ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Duration:</span>
                        <span>{visitor.visitDetails.estimatedDuration}min meeting</span>
                      </div>
                      {visitor.visitDetails.meetingLocation && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Location:</span>
                          <span>{visitor.visitDetails.meetingLocation}</span>
                        </div>
                      )}
                      {visitor.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{visitor.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <Button variant="outline" className="w-full" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredVisitors.length === 0 && !loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              {searchQuery ? (
                <>
                  <Search className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Matching Visitors</h3>
                  <p className="text-muted-foreground">
                    No active visitors match your search criteria.
                  </p>
                </>
              ) : (
                <>
                  <Users className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Visitors</h3>
                  <p className="text-muted-foreground">
                    No visitors are currently checked in.
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* Statistics */}
          {activeVisitors.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{activeVisitors.length}</div>
                      <div className="text-sm text-muted-foreground">Total Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {activeVisitors.filter(v => {
                          const checkInTime = v.checkInTime || new Date()
                          const diffInMinutes = Math.floor((new Date().getTime() - checkInTime.getTime()) / (1000 * 60))
                          return diffInMinutes < 30
                        }).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Recent Arrivals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {activeVisitors.filter(v => {
                          const checkInTime = v.checkInTime || new Date()
                          const diffInMinutes = Math.floor((new Date().getTime() - checkInTime.getTime()) / (1000 * 60))
                          return diffInMinutes > v.visitDetails.estimatedDuration
                        }).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Overdue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {new Set(activeVisitors.map(v => v.visitDetails.department)).size}
                      </div>
                      <div className="text-sm text-muted-foreground">Departments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
