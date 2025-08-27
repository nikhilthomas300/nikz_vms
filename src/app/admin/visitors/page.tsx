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
  Filter,
  Calendar,
  Clock,
  Building,
  User,
  Mail,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download
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

export default function AdminVisitorsPage() {
  const [loading, setLoading] = useState(true)
  const [visitors] = useState(mockVisitors)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "scheduled" | "checked-in" | "completed" | "overdue">("all")

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const filteredVisitors = visitors.filter(visitor => {
    const fullName = `${visitor.firstName} ${visitor.lastName}`
    const matchesSearch = fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visitor.visitDetails.hostName.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (statusFilter === "all") return matchesSearch
    return matchesSearch && visitor.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "checked-in":
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    total: visitors.length,
    scheduled: visitors.filter(v => v.status === 'scheduled').length,
    checkedIn: visitors.filter(v => v.status === 'checked-in').length,
    completed: visitors.filter(v => v.status === 'checked-out').length,
    overdue: visitors.filter(v => v.status === 'overdue').length
  }

  return (
    <MainLayout role="admin" title="All Visitors">
      <GlobalLoader isLoading={loading} text="Loading visitor data..." />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  All Visitors
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive visitor management and oversight
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Visitor
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{stats.scheduled}</div>
                <div className="text-sm text-muted-foreground">Scheduled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{stats.checkedIn}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600 mb-1">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{stats.overdue}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
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
                      placeholder="Search visitors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["all", "scheduled", "checked-in", "completed", "overdue"].map((status) => (
                      <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(status as typeof statusFilter)}
                        className="capitalize"
                      >
                        <Filter className="h-3 w-3 mr-1" />
                        {status.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visitors Table */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Visitor Records</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium">Visitor</th>
                        <th className="text-left p-4 font-medium">Company</th>
                        <th className="text-left p-4 font-medium">Host</th>
                        <th className="text-left p-4 font-medium">Visit Date</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisitors.map((visitor, index) => (
                        <motion.tr
                          key={visitor.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b hover:bg-muted/25 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                {visitor.firstName[0]}{visitor.lastName[0]}
                              </Avatar>
                              <div>
                                <div className="font-medium">{visitor.firstName} {visitor.lastName}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {visitor.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              {visitor.company || "N/A"}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-muted-foreground" />
                              {visitor.visitDetails.hostName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {visitor.visitDetails.department}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(visitor.status)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Empty State */}
          {filteredVisitors.length === 0 && !loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Users className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Visitors Found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No visitors match your search criteria: "${searchQuery}"`
                  : "No visitor records available"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}
