"use client"

import { useState } from "react"
import { Calendar, Download, Filter, TrendingUp, Users, Building, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalLoader } from "@/components/ui/global-loader"

interface Report {
  id: string
  title: string
  description: string
  category: 'visitor' | 'security' | 'host' | 'system'
  lastGenerated: string
  frequency: 'daily' | 'weekly' | 'monthly'
  status: 'ready' | 'generating' | 'failed'
}

interface Analytics {
  totalVisitors: number
  avgVisitDuration: number
  peakHour: string
  topDepartment: string
  securityAlerts: number
  hostUtilization: number
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Daily Visitor Summary",
    description: "Comprehensive overview of daily visitor activities",
    category: "visitor",
    lastGenerated: "2024-01-15T08:00:00Z",
    frequency: "daily",
    status: "ready"
  },
  {
    id: "2",
    title: "Security Incident Report",
    description: "Security alerts and incidents summary",
    category: "security",
    lastGenerated: "2024-01-15T00:00:00Z",
    frequency: "daily",
    status: "ready"
  },
  {
    id: "3",
    title: "Host Performance Analytics",
    description: "Host response times and visitor satisfaction",
    category: "host",
    lastGenerated: "2024-01-14T23:00:00Z",
    frequency: "weekly",
    status: "generating"
  },
  {
    id: "4",
    title: "System Usage Report",
    description: "Platform usage statistics and performance metrics",
    category: "system",
    lastGenerated: "2024-01-01T00:00:00Z",
    frequency: "monthly",
    status: "ready"
  }
]

const mockAnalytics: Analytics = {
  totalVisitors: 1247,
  avgVisitDuration: 45,
  peakHour: "2:00 PM",
  topDepartment: "Engineering",
  securityAlerts: 3,
  hostUtilization: 87
}

export default function AdminReportsPage() {
  const [isLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredReports = selectedCategory === "all" 
    ? mockReports 
    : mockReports.filter(report => report.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'default'
      case 'generating': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'secondary'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visitor': return <Users className="h-4 w-4" />
      case 'security': return <Building className="h-4 w-4" />
      case 'host': return <Clock className="h-4 w-4" />
      case 'system': return <TrendingUp className="h-4 w-4" />
      default: return <Filter className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return <GlobalLoader isLoading={true} text="Loading reports..." />
  }

  return (
    <MainLayout role="admin" title="Reports & Analytics" subtitle="View insights and generate detailed reports">
      <div className="p-6 space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.totalVisitors}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.avgVisitDuration}m</div>
              <p className="text-xs text-muted-foreground">Average visit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.peakHour}</div>
              <p className="text-xs text-muted-foreground">Busiest time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Department</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{mockAnalytics.topDepartment}</div>
              <p className="text-xs text-muted-foreground">Most visits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.securityAlerts}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Host Utilization</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.hostUtilization}%</div>
              <p className="text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Generate and download detailed reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All</TabsTrigger>
                <TabsTrigger value="visitor" onClick={() => setSelectedCategory("visitor")}>Visitor</TabsTrigger>
                <TabsTrigger value="security" onClick={() => setSelectedCategory("security")}>Security</TabsTrigger>
                <TabsTrigger value="host" onClick={() => setSelectedCategory("host")}>Host</TabsTrigger>
                <TabsTrigger value="system" onClick={() => setSelectedCategory("system")}>System</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedCategory} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            {getCategoryIcon(report.category)}
                            <div>
                              <CardTitle className="text-lg">{report.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {report.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(report.status) as "default" | "secondary" | "destructive"}>
                            {report.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Frequency</p>
                            <p className="font-medium capitalize">{report.frequency}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Generated</p>
                            <p className="font-medium">{formatDate(report.lastGenerated)}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <Button variant="outline" size="sm" disabled={report.status !== 'ready'}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                          <Button size="sm" disabled={report.status !== 'ready'}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
