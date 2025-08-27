"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChartLine, 
  Users, 
  Building, 
  Shield, 
  TrendingUp,
  Download,
  Settings,
  UserCog,
  BarChart3} from "lucide-react"

// Mock data for admin dashboard
const mockAdminStats = {
  totalVisitors: 1247,
  activeUsers: 45,
  systemHealth: 98,
  monthlyGrowth: 12
}

const mockRecentActivity = [
  {
    id: "1",
    action: "New visitor registered",
    user: "John Smith",
    timestamp: "2024-08-27T15:30:00",
    type: "visitor"
  },
  {
    id: "2", 
    action: "Host account created",
    user: "Alice Johnson",
    timestamp: "2024-08-27T14:15:00",
    type: "user"
  },
  {
    id: "3",
    action: "Security alert resolved",
    user: "Security Team",
    timestamp: "2024-08-27T13:45:00",
    type: "security"
  }
]

const mockSystemMetrics = [
  { label: "System Uptime", value: "99.9%", trend: "up" },
  { label: "Response Time", value: "< 200ms", trend: "stable" },
  { label: "Storage Usage", value: "67%", trend: "up" },
  { label: "Active Sessions", value: "156", trend: "up" }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "visitor":
      return <Users className="h-4 w-4 text-blue-600" />
    case "user":
      return <UserCog className="h-4 w-4 text-green-600" />
    case "security":
      return <Shield className="h-4 w-4 text-red-600" />
    default:
      return <BarChart3 className="h-4 w-4 text-gray-600" />
  }
}

export default function AdminDashboard() {
  return (
    <MainLayout 
      role="admin" 
      title="Admin Dashboard" 
      subtitle="System overview and management console"
    >
      <div className="p-6 space-y-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminStats.totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All time registrations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAdminStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Hosts & Security staff
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockAdminStats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">
                Overall system status
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">+{mockAdminStats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">
                Visitor registrations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Quick access to administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="flex items-center justify-center space-x-2 h-20 flex-col">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-20 flex-col">
                <ChartLine className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-20 flex-col">
                <Download className="h-6 w-6" />
                <span>Export Data</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center space-x-2 h-20 flex-col">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.user}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>System Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSystemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={metric.trend === 'up' ? 'default' : 'outline'}
                        className={
                          metric.trend === 'up' ? 'text-green-600 border-green-200' :
                          metric.trend === 'down' ? 'text-red-600 border-red-200' :
                          'text-gray-600 border-gray-200'
                        }
                      >
                        {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Detailed Metrics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Visitor trends and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">847</div>
                <div className="text-sm text-muted-foreground mb-1">This Month</div>
                <Badge variant="outline" className="text-green-600 border-green-200">+15%</Badge>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                <div className="text-sm text-muted-foreground mb-1">This Week</div>
                <Badge variant="outline" className="text-green-600 border-green-200">+8%</Badge>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
                <div className="text-sm text-muted-foreground mb-1">Today</div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">Normal</Badge>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>View Detailed Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
