"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  UserPlus,
  FileText,
  Star,
  MessageCircle,
  Clock,
  MapPin,
  Building,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react"
import Link from "next/link"

// Mock data for visitor dashboard
const mockVisitorStats = {
  totalVisits: 12,
  upcomingVisits: 2,
  completedVisits: 10,
  pendingFeedback: 1
}

const mockUpcomingVisits = [
  {
    id: "1",
    hostName: "Alice Johnson",
    hostAvatar: "AJ",
    department: "Sales",
    scheduledTime: "2024-08-28T10:00:00",
    purpose: "Product Demo",
    location: "Conference Room A",
    status: "confirmed"
  },
  {
    id: "2",
    hostName: "Bob Chen", 
    hostAvatar: "BC",
    department: "Engineering",
    scheduledTime: "2024-08-30T14:00:00",
    purpose: "Technical Discussion",
    location: "Meeting Room B",
    status: "pending"
  }
]

const mockPastVisits = [
  {
    id: "1",
    hostName: "Carol White",
    hostAvatar: "CW",
    company: "TechCorp Inc.",
    visitDate: "2024-08-25T15:00:00",
    purpose: "Partnership Meeting",
    duration: "1.5 hours",
    feedbackGiven: false
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function VisitorDashboard() {
  return (
    <MainLayout 
      role="visitor" 
      title="Visitor Portal" 
      subtitle="Manage your visits and registration"
      showSearch={false}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground">Manage your visits and stay connected with your hosts.</p>
            </div>
            <Link href="/visitor/pre-register">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <UserPlus className="h-4 w-4" />
                Schedule New Visit
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Visits</p>
                    <p className="text-2xl font-bold">{mockVisitorStats.totalVisits}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +2 this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold">{mockVisitorStats.upcomingVisits}</p>
                    <p className="text-xs text-muted-foreground mt-1">Next visit today</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{mockVisitorStats.completedVisits}</p>
                    <p className="text-xs text-muted-foreground mt-1">Successfully finished</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Feedback Due</p>
                    <p className="text-2xl font-bold">{mockVisitorStats.pendingFeedback}</p>
                    <p className="text-xs text-orange-600 mt-1">Action required</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Visits */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Visits
                    </CardTitle>
                    <CardDescription>Your scheduled appointments</CardDescription>
                  </div>
                  <Link href="/visitor/history">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockUpcomingVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {visit.hostAvatar}
                          </div>
                        </Avatar>
                        <div className="min-w-0">
                          <h4 className="font-medium truncate">{visit.hostName}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building className="h-3 w-3 flex-shrink-0" />
                            <span>{visit.department}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(visit.status)}
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(visit.scheduledTime).toLocaleDateString()}
                        </span>
                        <span className="text-muted-foreground">
                          at {new Date(visit.scheduledTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{visit.purpose}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{visit.location}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {mockUpcomingVisits.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No upcoming visits scheduled</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your latest visit history</CardDescription>
                  </div>
                  <Link href="/visitor/history">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPastVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                            {visit.hostAvatar}
                          </div>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{visit.hostName}</h4>
                          <p className="text-sm text-muted-foreground">{visit.company}</p>
                        </div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700">
                        Completed
                      </Badge>
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{new Date(visit.visitDate).toLocaleDateString()}</span>
                        <span className="text-muted-foreground">• {visit.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{visit.purpose}</span>
                      </div>
                    </div>

                    {!visit.feedbackGiven && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full gap-1 text-orange-600">
                          <Star className="h-3 w-3" />
                          Provide Feedback
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {mockPastVisits.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/visitor/pre-register">
                  <Button variant="outline" className="h-20 flex flex-col gap-2 w-full">
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Schedule Visit</span>
                  </Button>
                </Link>
                
                <Link href="/visitor/history">
                  <Button variant="outline" className="h-20 flex flex-col gap-2 w-full">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Visit History</span>
                  </Button>
                </Link>
                
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Feedback</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Building className="h-6 w-6" />
                  <span className="text-sm">Locations</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
