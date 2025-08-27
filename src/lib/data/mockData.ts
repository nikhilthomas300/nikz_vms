import { Visitor, Host, VisitSession, SecurityAlert, DashboardStats } from "@/types"

// Mock Hosts Data
export const mockHosts: Host[] = [
  {
    id: "h1",
    name: "Alice Johnson",
    email: "alice@company.com",
    department: "Sales",
    title: "Sales Manager",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "h2", 
    name: "Bob Chen",
    email: "bob@company.com",
    department: "Engineering",
    title: "Senior Engineer",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "h3",
    name: "Carol White",
    email: "carol@company.com", 
    department: "Marketing",
    title: "Marketing Director",
    avatarUrl: "/api/placeholder/40/40"
  }
]

// Mock Visitors Data
export const mockVisitors: Visitor[] = [
  {
    id: "v1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@techcorp.com",
    phone: "+1-555-0101",
    company: "TechCorp",
    photoUrl: "/api/placeholder/60/60",
    idDocument: {
      type: "Driver's License",
      number: "DL123456789",
      imageUrl: "/api/placeholder/200/120"
    },
    visitDetails: {
      hostName: "Alice Johnson",
      hostEmail: "alice@company.com",
      department: "Sales",
      purpose: "Product Demo",
      scheduledTime: new Date("2024-08-27T14:00:00"),
      estimatedDuration: 60,
      meetingLocation: "Conference Room A",
      specialRequests: "Need projector setup"
    },
    status: "scheduled",
    badgeId: "B001",
    createdAt: new Date("2024-08-26T10:00:00"),
    updatedAt: new Date("2024-08-26T10:00:00")
  },
  {
    id: "v2",
    firstName: "Sarah",
    lastName: "Wilson", 
    email: "sarah.wilson@innovatelabs.com",
    phone: "+1-555-0102",
    company: "InnovateLabs",
    photoUrl: "/api/placeholder/60/60",
    visitDetails: {
      hostName: "Bob Chen",
      hostEmail: "bob@company.com",
      department: "Engineering",
      purpose: "Technical Discussion",
      scheduledTime: new Date("2024-08-27T15:30:00"),
      estimatedDuration: 90,
      meetingLocation: "Meeting Room B"
    },
    status: "checked-in",
    badgeId: "B002",
    checkInTime: new Date("2024-08-27T15:25:00"),
    createdAt: new Date("2024-08-26T11:30:00"),
    updatedAt: new Date("2024-08-27T15:25:00")
  },
  {
    id: "v3",
    firstName: "Mike", 
    lastName: "Davis",
    email: "mike@startupx.com",
    phone: "+1-555-0103",
    company: "StartupX",
    photoUrl: "/api/placeholder/60/60",
    visitDetails: {
      hostName: "Carol White",
      hostEmail: "carol@company.com",
      department: "Marketing", 
      purpose: "Partnership Meeting",
      scheduledTime: new Date("2024-08-27T12:00:00"),
      estimatedDuration: 120,
      meetingLocation: "Executive Conference Room"
    },
    status: "overdue",
    badgeId: "B003",
    checkInTime: new Date("2024-08-27T11:55:00"),
    createdAt: new Date("2024-08-25T14:20:00"),
    updatedAt: new Date("2024-08-27T11:55:00")
  },
  {
    id: "v4",
    firstName: "Emma",
    lastName: "Brown",
    email: "emma@designco.com", 
    phone: "+1-555-0104",
    company: "DesignCo",
    visitDetails: {
      hostName: "Alice Johnson",
      hostEmail: "alice@company.com",
      department: "Sales",
      purpose: "Design Consultation",
      scheduledTime: new Date("2024-08-26T10:00:00"),
      estimatedDuration: 60,
      meetingLocation: "Design Studio"
    },
    status: "checked-out",
    badgeId: "B004",
    checkInTime: new Date("2024-08-26T09:58:00"),
    checkOutTime: new Date("2024-08-26T11:15:00"),
    createdAt: new Date("2024-08-25T16:45:00"),
    updatedAt: new Date("2024-08-26T11:15:00")
  }
]

// Mock Visit Sessions
export const mockVisitSessions: VisitSession[] = [
  {
    id: "vs1",
    visitorId: "v1", 
    hostId: "h1",
    scheduledTime: new Date("2024-08-27T14:00:00"),
    status: "scheduled",
    badgeNumber: "B001"
  },
  {
    id: "vs2",
    visitorId: "v2",
    hostId: "h2", 
    scheduledTime: new Date("2024-08-27T15:30:00"),
    actualStartTime: new Date("2024-08-27T15:25:00"),
    status: "in-progress",
    badgeNumber: "B002"
  },
  {
    id: "vs3",
    visitorId: "v3",
    hostId: "h3",
    scheduledTime: new Date("2024-08-27T12:00:00"),
    actualStartTime: new Date("2024-08-27T11:55:00"),
    status: "in-progress",
    badgeNumber: "B003",
    notes: "Visitor exceeded scheduled time"
  },
  {
    id: "vs4",
    visitorId: "v4",
    hostId: "h1",
    scheduledTime: new Date("2024-08-26T10:00:00"), 
    actualStartTime: new Date("2024-08-26T09:58:00"),
    actualEndTime: new Date("2024-08-26T11:15:00"),
    status: "completed",
    badgeNumber: "B004",
    feedback: {
      rating: 5,
      comment: "Excellent meeting, very productive discussion",
      submitted: new Date("2024-08-26T11:20:00")
    }
  }
]

// Mock Security Alerts
export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "sa1",
    type: "overdue",
    visitorId: "v3",
    message: "Mike Davis has exceeded scheduled visit time by 45 minutes",
    severity: "medium",
    timestamp: new Date("2024-08-27T15:30:00"),
    acknowledged: false
  },
  {
    id: "sa2", 
    type: "unauthorized-area",
    message: "Unregistered person detected in restricted area - Floor 5",
    severity: "high",
    timestamp: new Date("2024-08-27T15:15:00"),
    acknowledged: false
  },
  {
    id: "sa3",
    type: "missing-badge",
    visitorId: "v2",
    message: "Visitor Sarah Wilson detected without visible badge",
    severity: "low",
    timestamp: new Date("2024-08-27T15:20:00"),
    acknowledged: true,
    acknowledgedBy: "Security Team"
  }
]

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalVisitors: 1243,
  activeVisitors: 15,
  scheduledToday: 28,
  checkedInToday: 25,
  overdueVisitors: 2,
  averageVisitDuration: 75 // minutes
}

// Mock Users (for admin)
export interface User {
  id: string
  name: string
  email: string
  role: 'host' | 'security' | 'admin'
  department: string
  lastActive: Date
  status: 'active' | 'inactive'
  avatarUrl?: string
}

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alice Johnson", 
    email: "alice@company.com",
    role: "host",
    department: "Sales",
    lastActive: new Date("2024-08-27T10:30:00"),
    status: "active",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "u2",
    name: "Bob Chen",
    email: "bob@company.com",
    role: "host", 
    department: "Engineering",
    lastActive: new Date("2024-08-27T11:15:00"),
    status: "active",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "u3",
    name: "Carol White",
    email: "carol@company.com",
    role: "host",
    department: "Marketing",
    lastActive: new Date("2024-08-26T16:45:00"),
    status: "inactive",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "u4",
    name: "David Security",
    email: "david@company.com",
    role: "security",
    department: "Security",
    lastActive: new Date("2024-08-27T12:00:00"),
    status: "active",
    avatarUrl: "/api/placeholder/40/40"
  },
  {
    id: "u5",
    name: "Admin User",
    email: "admin@company.com", 
    role: "admin",
    department: "IT",
    lastActive: new Date("2024-08-27T13:45:00"),
    status: "active",
    avatarUrl: "/api/placeholder/40/40"
  }
]

// Utility functions for data manipulation
export const getVisitorsByStatus = (status: Visitor['status']) => {
  return mockVisitors.filter(visitor => visitor.status === status)
}

export const getTodaysVisitors = () => {
  const today = new Date().toDateString()
  return mockVisitors.filter(visitor => 
    visitor.visitDetails.scheduledTime.toDateString() === today
  )
}

export const getOverdueVisitors = () => {
  return mockVisitors.filter(visitor => visitor.status === 'overdue')
}

export const getActiveAlerts = () => {
  return mockSecurityAlerts.filter(alert => !alert.acknowledged)
}

export const getVisitorById = (id: string) => {
  return mockVisitors.find(visitor => visitor.id === id)
}

export const getHostById = (id: string) => {
  return mockHosts.find(host => host.id === id)
}
