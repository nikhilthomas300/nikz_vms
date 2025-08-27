"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading-spinner"
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin,
  Eye,
  Edit,
  UserCheck,
  UserX,
  Plus,
  Search,
  Phone,
  Mail,
  Building
} from "lucide-react"
import { mockVisitors } from "@/lib/data/mockData"

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

export default function MyVisitorsPage() {
  const [visitors, setVisitors] = useState<typeof mockVisitors>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'past'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVisitors(mockVisitors)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredVisitors = visitors.filter(visitor => {
    const visitDate = new Date(visitor.visitDetails.scheduledTime)
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

    // Apply date filter
    let matchesDateFilter = true
    switch (filter) {
      case 'today':
        matchesDateFilter = visitDate >= startOfToday && visitDate <= endOfToday
        break
      case 'upcoming':
        matchesDateFilter = visitDate > endOfToday
        break
      case 'past':
        matchesDateFilter = visitDate < startOfToday
        break
      default:
        matchesDateFilter = true
    }

    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      `${visitor.firstName} ${visitor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.visitDetails.purpose.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDateFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'scheduled': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'Scheduled' },
      'checked-in': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Checked In' },
      'in-meeting': { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', label: 'In Meeting' },
      'checked-out': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', label: 'Checked Out' },
      'overdue': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Overdue' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['scheduled']
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getFilterCount = (filterType: string) => {
    return visitors.filter(visitor => {
      const visitDate = new Date(visitor.visitDetails.scheduledTime)
      const today = new Date()
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

      switch (filterType) {
        case 'today':
          return visitDate >= startOfToday && visitDate <= endOfToday
        case 'upcoming':
          return visitDate > endOfToday
        case 'past':
          return visitDate < startOfToday
        default:
          return true
      }
    }).length
  }

  if (loading) {
    return (
      <MainLayout role="host" title="My Visitors" subtitle="Manage and track your scheduled visitors">
        <div className="p-4 lg:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded px-4 animate-pulse w-20" />
              ))}
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout role="host" title="My Visitors" subtitle="Manage and track your scheduled visitors">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search visitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All', count: visitors.length },
                { key: 'today', label: 'Today', count: getFilterCount('today') },
                { key: 'upcoming', label: 'Upcoming', count: getFilterCount('upcoming') },
                { key: 'past', label: 'Past', count: getFilterCount('past') }
              ].map(({ key, label, count }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(key as 'all' | 'today' | 'upcoming' | 'past')}
                  className="gap-1"
                >
                  {label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Add Visitor */}
          <Button className="gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Schedule Visit
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                  <p className="text-2xl font-bold">{visitors.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">{getFilterCount('today')}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{getFilterCount('upcoming')}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{getFilterCount('past')}</p>
                </div>
                <UserCheck className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visitors Grid */}
        {filteredVisitors.length === 0 ? (
          <Card className="text-center p-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No visitors found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'You haven\'t scheduled any visitors yet.'}
            </p>
            {(!searchQuery && filter === 'all') && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Your First Visit
              </Button>
            )}
          </Card>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filteredVisitors.map((visitor) => (
              <motion.div key={visitor.id} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {visitor.firstName[0]}{visitor.lastName[0]}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{visitor.firstName} {visitor.lastName}</CardTitle>
                          {visitor.company && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <Building className="h-3 w-3" />
                              {visitor.company}
                            </div>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(visitor.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(visitor.visitDetails.scheduledTime).toLocaleDateString()}
                        </span>
                        <span className="text-muted-foreground">
                          at {new Date(visitor.visitDetails.scheduledTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{visitor.visitDetails.purpose}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{visitor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{visitor.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1"
                        disabled={visitor.status === 'checked-in' || visitor.status === 'in-meeting'}
                      >
                        {visitor.status === 'checked-in' || visitor.status === 'in-meeting' ? (
                          <UserCheck className="h-3 w-3" />
                        ) : (
                          <UserX className="h-3 w-3" />
                        )}
                        {visitor.status === 'checked-in' || visitor.status === 'in-meeting' ? 'Active' : 'Cancel'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  )
}
