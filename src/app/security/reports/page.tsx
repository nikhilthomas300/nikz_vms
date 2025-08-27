"use client"

import { useState } from "react"
import { Download, Calendar, Shield, AlertTriangle, Clock, TrendingUp, Users, Building } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalLoader } from "@/components/ui/global-loader"

interface SecurityReport {
  id: string
  title: string
  description: string
  type: 'incident' | 'daily' | 'alert' | 'audit'
  date: string
  status: 'completed' | 'pending' | 'reviewing'
  severity: 'low' | 'medium' | 'high' | 'critical'
  incidents: number
}

interface SecurityMetrics {
  totalIncidents: number
  resolvedIncidents: number
  activeAlerts: number
  averageResponseTime: number
  securityScore: number
  visitorScreenings: number
}

const mockReports: SecurityReport[] = [
  {
    id: "1",
    title: "Daily Security Summary",
    description: "Comprehensive security overview for today",
    type: "daily",
    date: "2024-01-15",
    status: "completed",
    severity: "low",
    incidents: 2
  },
  {
    id: "2",
    title: "Unauthorized Access Attempt",
    description: "Failed badge access in restricted area",
    type: "incident",
    date: "2024-01-15",
    status: "reviewing",
    severity: "high",
    incidents: 1
  },
  {
    id: "3",
    title: "Visitor Screening Alert",
    description: "Watchlist match detected during check-in",
    type: "alert",
    date: "2024-01-15",
    status: "pending",
    severity: "critical",
    incidents: 1
  },
  {
    id: "4",
    title: "Weekly Security Audit",
    description: "Comprehensive security system audit",
    type: "audit",
    date: "2024-01-14",
    status: "completed",
    severity: "medium",
    incidents: 5
  }
]

const mockMetrics: SecurityMetrics = {
  totalIncidents: 23,
  resolvedIncidents: 19,
  activeAlerts: 4,
  averageResponseTime: 12,
  securityScore: 87,
  visitorScreenings: 156
}

export default function SecurityReportsPage() {
  const [isLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredReports = selectedType === "all" 
    ? mockReports 
    : mockReports.filter(report => report.type === selectedType)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'default'
      case 'medium': return 'secondary'
      case 'high': return 'destructive'
      case 'critical': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'reviewing': return 'destructive'
      default: return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incident': return <AlertTriangle className="h-4 w-4" />
      case 'daily': return <Calendar className="h-4 w-4" />
      case 'alert': return <Shield className="h-4 w-4" />
      case 'audit': return <Building className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return <GlobalLoader isLoading={true} text="Loading security reports..." />
  }

  return (
    <MainLayout role="security" title="Security Reports" subtitle="Monitor security incidents and generate reports">
      <div className="p-6 space-y-6">
        {/* Action Button */}
        <div className="flex justify-end">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All Reports
          </Button>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalIncidents}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.resolvedIncidents}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((mockMetrics.resolvedIncidents / mockMetrics.totalIncidents) * 100)}% resolution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockMetrics.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.averageResponseTime}m</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockMetrics.securityScore}%</div>
              <p className="text-xs text-muted-foreground">Overall rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screenings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.visitorScreenings}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Security Reports</CardTitle>
            <CardDescription>
              Recent security incidents, alerts, and audit reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" onClick={() => setSelectedType("all")}>All</TabsTrigger>
                <TabsTrigger value="incident" onClick={() => setSelectedType("incident")}>Incidents</TabsTrigger>
                <TabsTrigger value="alert" onClick={() => setSelectedType("alert")}>Alerts</TabsTrigger>
                <TabsTrigger value="daily" onClick={() => setSelectedType("daily")}>Daily</TabsTrigger>
                <TabsTrigger value="audit" onClick={() => setSelectedType("audit")}>Audits</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedType} className="mt-6">
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <div className="mt-1">
                              {getTypeIcon(report.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold truncate">
                                {report.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1">
                                {report.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                <Badge variant="outline">
                                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                                </Badge>
                                <Badge variant={getSeverityColor(report.severity) as "default" | "secondary" | "destructive"}>
                                  {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                                </Badge>
                                <Badge variant={getStatusColor(report.status) as "default" | "secondary" | "destructive"}>
                                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:items-end gap-2">
                            <div className="text-sm text-muted-foreground">
                              {formatDate(report.date)}
                            </div>
                            <div className="text-sm font-medium">
                              {report.incidents} incident{report.incidents !== 1 ? 's' : ''}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
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
            <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try selecting a different report type.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
