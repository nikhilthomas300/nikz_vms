"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Building, Users, Shield } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { GlobalLoader } from "@/components/ui/global-loader"

interface Host {
  id: string
  name: string
  email: string
  phone: string
  department: string
  role: string
  building: string
  floor: string
  avatar?: string
  status: 'active' | 'inactive'
  lastActive: string
  totalVisitors: number
  pendingRequests: number
}

const mockHosts: Host[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "(555) 123-4567",
    department: "Human Resources",
    role: "HR Manager",
    building: "Main Building",
    floor: "2nd Floor",
    status: "active",
    lastActive: "2024-01-15T10:30:00Z",
    totalVisitors: 45,
    pendingRequests: 3
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "(555) 234-5678",
    department: "Engineering",
    role: "Engineering Manager",
    building: "Tech Center",
    floor: "3rd Floor",
    status: "active",
    lastActive: "2024-01-15T09:15:00Z",
    totalVisitors: 78,
    pendingRequests: 1
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "(555) 345-6789",
    department: "Sales",
    role: "Sales Director",
    building: "Main Building",
    floor: "1st Floor",
    status: "inactive",
    lastActive: "2024-01-14T16:45:00Z",
    totalVisitors: 23,
    pendingRequests: 0
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david.thompson@company.com",
    phone: "(555) 456-7890",
    department: "Marketing",
    role: "Marketing Lead",
    building: "Creative Hub",
    floor: "2nd Floor",
    status: "active",
    lastActive: "2024-01-15T11:20:00Z",
    totalVisitors: 67,
    pendingRequests: 5
  }
]

export default function AdminHostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading] = useState(false)

  const filteredHosts = mockHosts.filter(host =>
    host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  if (isLoading) {
    return <GlobalLoader isLoading={true} text="Loading hosts..." />
  }

  return (
    <MainLayout role="admin" title="Host Management" subtitle="Manage and monitor all hosts in the system">
      <div className="p-6 space-y-6">
        {/* Action Button */}
        <div className="flex justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Host
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hosts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHosts.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockHosts.filter(h => h.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHosts.reduce((sum, host) => sum + host.pendingRequests, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all hosts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHosts.reduce((sum, host) => sum + host.totalVisitors, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockHosts.map(h => h.department)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Active departments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hosts by name, email, or department..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Hosts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHosts.map((host) => (
            <Card key={host.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={host.avatar} />
                      <AvatarFallback>{host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{host.name}</CardTitle>
                      <CardDescription>{host.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={host.status === 'active' ? 'default' : 'secondary'}>
                      {host.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium">{host.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{host.building}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Visitors</p>
                    <p className="font-medium">{host.totalVisitors}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-medium">{host.pendingRequests}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="text-sm font-medium">{formatLastActive(host.lastActive)}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{host.name}</DialogTitle>
                        <DialogDescription>Host Details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Email</Label>
                            <p className="text-sm">{host.email}</p>
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <p className="text-sm">{host.phone}</p>
                          </div>
                          <div>
                            <Label>Building</Label>
                            <p className="text-sm">{host.building}</p>
                          </div>
                          <div>
                            <Label>Floor</Label>
                            <p className="text-sm">{host.floor}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHosts.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No hosts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
