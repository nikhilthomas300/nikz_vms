"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardSkeleton } from "@/components/ui/loading-spinner"
import { VisitorModal } from "@/components/ui/visitor-modal"
import { MainLayout } from "@/components/layout/main-layout"
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin
} from "lucide-react"
import { mockVisitors } from "@/lib/data/mockData"
import { Visitor } from "@/types"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVisitors(mockVisitors)
      setLoading(false)
    }, 1500)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getVisitorsForDate = (date: Date | null) => {
    if (!date) return []
    return visitors.filter(visitor => {
      const visitDate = new Date(visitor.scheduledTime)
      return visitDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      'scheduled': 'bg-blue-500',
      'checked-in': 'bg-green-500',
      'in-meeting': 'bg-purple-500',
      'checked-out': 'bg-gray-500',
      'overdue': 'bg-red-500'
    }
    return colors[status as keyof typeof colors] || colors.scheduled
  }

  if (loading) {
    return (
      <MainLayout role="host" title="Calendar" subtitle="View and manage your scheduled visitors">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CardSkeleton className="h-96" />
            </div>
            <CardSkeleton />
          </div>
        </div>
      </MainLayout>
    )
  }

  const selectedDateVisitors = getVisitorsForDate(selectedDate)
  const days = getDaysInMonth(currentDate)

  return (
    <MainLayout role="host" title="Calendar" subtitle="View and manage your scheduled visitors">
      <div className="p-6 space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Action Button */}
          <motion.div variants={itemVariants} className="flex justify-end">
            <VisitorModal
              mode="create"
              onSave={(visitor) => setVisitors([...visitors, visitor])}
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
              }
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar - More Compact */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('prev')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('next')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {/* Week headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid - More compact */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      const dayVisitors = getVisitorsForDate(day)
                      const isSelected = day && selectedDate.toDateString() === day.toDateString()
                      const isToday = day && new Date().toDateString() === day.toDateString()
                      
                      return (
                        <motion.div
                          key={index}
                          whileHover={day ? { scale: 1.02 } : {}}
                          className={`
                            min-h-[60px] p-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer
                            transition-all duration-200
                            ${day ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : 'cursor-default'}
                            ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' : ''}
                            ${isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                            ${!day ? 'bg-gray-50 dark:bg-gray-900' : ''}
                          `}
                          onClick={() => day && setSelectedDate(day)}
                        >
                          {day && (
                            <div className="h-full flex flex-col">
                              <span className={`
                                text-xs font-medium mb-1
                                ${isToday ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-900 dark:text-white'}
                              `}>
                                {day.getDate()}
                              </span>
                              <div className="space-y-0.5 flex-1">
                                {dayVisitors.slice(0, 1).map(visitor => (
                                  <div
                                    key={visitor.id}
                                    className={`
                                      text-xs px-1 py-0.5 rounded text-white truncate
                                      ${getStatusColor(visitor.status)}
                                    `}
                                    title={`${visitor.name} - ${new Date(visitor.scheduledTime).toLocaleTimeString()}`}
                                  >
                                    {visitor.name.split(' ')[0]}
                                  </div>
                                ))}
                                {dayVisitors.length > 1 && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                                    +{dayVisitors.length - 1}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          {/* Selected date details */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDateVisitors.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No visitors scheduled for this date
                    </p>
                    <VisitorModal
                      mode="create"
                      onSave={(visitor) => setVisitors([...visitors, visitor])}
                      trigger={
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule Visit
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {selectedDateVisitors.length} Visit{selectedDateVisitors.length !== 1 ? 's' : ''} Scheduled
                    </h3>
                    {selectedDateVisitors.map(visitor => (
                      <motion.div
                        key={visitor.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {visitor.name}
                          </h4>
                          <Badge className={getStatusColor(visitor.status).replace('bg-', 'bg-opacity-20 text-')}>
                            {visitor.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(visitor.scheduledTime).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3" />
                            <span className="truncate">{visitor.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span>Conference Room A</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    label: 'Total Visits',
                    value: visitors.filter(v => {
                      const visitDate = new Date(v.scheduledTime)
                      return visitDate.getMonth() === currentDate.getMonth() && 
                             visitDate.getFullYear() === currentDate.getFullYear()
                    }).length,
                    color: 'text-blue-600 dark:text-blue-400'
                  },
                  {
                    label: 'Completed',
                    value: visitors.filter(v => {
                      const visitDate = new Date(v.scheduledTime)
                      return visitDate.getMonth() === currentDate.getMonth() && 
                             visitDate.getFullYear() === currentDate.getFullYear() &&
                             v.status === 'checked-out'
                    }).length,
                    color: 'text-green-600 dark:text-green-400'
                  },
                  {
                    label: 'Upcoming',
                    value: visitors.filter(v => {
                      const visitDate = new Date(v.scheduledTime)
                      return visitDate.getMonth() === currentDate.getMonth() && 
                             visitDate.getFullYear() === currentDate.getFullYear() &&
                             visitDate > new Date()
                    }).length,
                    color: 'text-purple-600 dark:text-purple-400'
                  }
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </MainLayout>
  )
}
