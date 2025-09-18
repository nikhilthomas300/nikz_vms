"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Calendar, 
  Search,
  User,
  Building,
  CheckCircle,
  XCircle,
  Timer,
  Eye,
  Download
} from "lucide-react"
import { GlobalLoader } from "@/components/ui/global-loader"

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

// Extended mock data with historical visits
const mockVisitHistory = [
  {
    id: "vh1",
    date: new Date(2024, 0, 15),
    time: "14:00",
    hostName: "Alice Johnson",
    department: "Sales",
    purpose: "Product Demo",
    duration: 90,
    status: "completed",
    location: "Conference Room A"
  },
  {
    id: "vh2", 
    date: new Date(2024, 0, 8),
    time: "10:30",
    hostName: "Bob Chen",
    department: "Engineering", 
    purpose: "Technical Interview",
    duration: 120,
    status: "completed",
    location: "Meeting Room 3"
  },
  {
    id: "vh3",
    date: new Date(2023, 11, 20),
    time: "09:00",
    hostName: "Carol White",
    department: "Marketing",
    purpose: "Partnership Discussion",
    duration: 60,
    status: "completed",
    location: "Executive Suite"
  },
  {
    id: "vh4",
    date: new Date(2023, 11, 15),
    time: "15:30",
    hostName: "David Park",
    department: "HR",
    purpose: "Orientation Meeting",
    duration: 45,
    status: "completed", 
    location: "HR Office"
  },
  {
    id: "vh5",
    date: new Date(2023, 10, 22),
    time: "11:00",
    hostName: "Emma Wilson",
    department: "Finance",
    purpose: "Budget Review",
    duration: 75,
    status: "no-show",
    location: "Finance Conference Room"
  }
]

export default function VisitorHistoryPage() {
  const [loading, setLoading] = useState(true)
  const [visitHistory] = useState(mockVisitHistory)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "no-show" | "cancelled">("all")

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const filteredHistory = visitHistory.filter(visit => {
    const matchesSearch = visit.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (statusFilter === "all") return matchesSearch
    return matchesSearch && visit.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "no-show":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            No Show
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const totalVisits = visitHistory.length
  const completedVisits = visitHistory.filter(v => v.status === "completed").length
  const totalDuration = visitHistory
    .filter(v => v.status === "completed")
    .reduce((sum, v) => sum + v.duration, 0)

  return (
    <MainLayout role="visitor" title="Visit History" subtitle="View all your past visits and appointments">
      <GlobalLoader isLoading={loading} text="Loading visit history..." />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Export Action */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export History
              </Button>
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{totalVisits}</div>
                <div className="text-sm text-muted-foreground">Total Visits</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{completedVisits}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{formatDuration(totalDuration)}</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search visits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["all", "completed", "no-show", "cancelled"].map((status) => (
                      <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(status as typeof statusFilter)}
                        className="capitalize"
                      >
                        {status.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visit History List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {filteredHistory.map((visit, index) => (
              <motion.div
                key={visit.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{visit.purpose}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{visit.date.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{visit.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Timer className="h-3 w-3" />
                                <span>{formatDuration(visit.duration)}</span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(visit.status)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Host:</span>
                            <span>{visit.hostName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Department:</span>
                            <span>{visit.department}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Location:</span>
                            <span>{visit.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          {visit.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download Report
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredHistory.length === 0 && !loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              {searchQuery ? (
                <>
                  <Search className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Matching Visits</h3>
                  <p className="text-muted-foreground">
                    No visits found matching your search criteria.
                  </p>
                </>
              ) : (
                <>
                  <Clock className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Visit History</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t completed any visits yet.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/visitor/pre-register'}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Schedule Your First Visit
                  </Button>
                </>
              )}
            </motion.div>
          )}

          {/* Recent Activity Summary */}
          {filteredHistory.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Most recent visit: {visitHistory[0]?.date.toLocaleDateString()}</p>
                    <p>• Most visited department: {
                      Object.entries(
                        visitHistory.reduce((acc, visit) => {
                          acc[visit.department] = (acc[visit.department] || 0) + 1
                          return acc
                        }, {} as Record<string, number>)
                      ).sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A"
                    }</p>
                    <p>• Average visit duration: {
                      Math.round(totalDuration / completedVisits) || 0
                    } minutes</p>
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
