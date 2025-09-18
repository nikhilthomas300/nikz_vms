import { Visitor, Employee, VisitSession, SecurityAlert, DashboardStats, Meeting, MeetingType, Location } from "@/types"

// Mock Meeting Types
export const mockMeetingTypes: MeetingType[] = [
  { id: "mt1", name: "General Meeting", description: "Standard business meeting" },
  { id: "mt2", name: "Ad-Hoc Meeting", description: "Impromptu meeting" },
  { id: "mt3", name: "Client Presentation", description: "Presentation to clients" },
  { id: "mt4", name: "Project Review", description: "Project status review" },
  { id: "mt5", name: "Training Session", description: "Training or workshop" }
]

// Mock Locations, Towers, and Rooms
export const mockLocations: Location[] = [
  {
    id: "loc1",
    name: "Downtown Office",
    address: "123 Business Street, City",
    country: "United States",
    towers: [
      {
        id: "t1",
        name: "Tower A",
        locationId: "loc1",
        rooms: [
          { id: "r1", name: "Room A1", towerId: "t1", capacity: 10, features: ["Projector", "Whiteboard"] },
          { id: "r2", name: "Room A2", towerId: "t1", capacity: 6, features: ["TV Screen", "Conference Phone"] },
          { id: "r3", name: "Room A3", towerId: "t1", capacity: 15, features: ["Projector", "Video Conferencing"] }
        ]
      },
      {
        id: "t2",
        name: "Tower B",
        locationId: "loc1",
        rooms: [
          { id: "r4", name: "Room B1", towerId: "t2", capacity: 8, features: ["Smart Board", "Audio System"] },
          { id: "r5", name: "Room B2", towerId: "t2", capacity: 12, features: ["Projector", "Teleconferencing"] }
        ]
      }
    ]
  },
  {
    id: "loc2",
    name: "Tech Campus",
    address: "456 Innovation Drive, Tech City",
    country: "United States",
    towers: [
      {
        id: "t3",
        name: "Main Building",
        locationId: "loc2",
        rooms: [
          { id: "r6", name: "Innovation Lab", towerId: "t3", capacity: 20, features: ["Interactive Display", "Collaboration Tools"] },
          { id: "r7", name: "Executive Suite", towerId: "t3", capacity: 6, features: ["Premium AV Setup", "Private Lounge"] }
        ]
      }
    ]
  }
]

// Mock Employees Data
export const mockEmployees: Employee[] = [
  {
    id: "e1",
    name: "Alice Johnson",
    email: "alice@company.com",
    department: "Sales",
    title: "Sales Manager",
    avatarUrl: "/api/placeholder/40/40",
    locationId: "loc1"
  },
  {
    id: "e2", 
    name: "Bob Chen",
    email: "bob@company.com",
    department: "Engineering",
    title: "Senior Engineer",
    avatarUrl: "/api/placeholder/40/40",
    locationId: "loc1"
  },
  {
    id: "e3",
    name: "Carol White",
    email: "carol@company.com", 
    department: "Marketing",
    title: "Marketing Director",
    avatarUrl: "/api/placeholder/40/40",
    locationId: "loc2"
  }
]

// Mock Meetings Data
export const mockMeetings: Meeting[] = [
  {
    id: "m1",
    subject: "Product Demo Presentation",
    description: "Demonstration of our new product features to potential client",
    type: mockMeetingTypes[2], // Client Presentation
    country: "United States",
    location: mockLocations[0],
    tower: "Tower A",
    room: mockLocations[0].towers[0].rooms[0], // Room A1
    startTime: new Date("2025-09-17T14:00:00"),
    endTime: new Date("2025-09-17T15:00:00"),
    employeeId: "e1",
    employee: mockEmployees[0],
    visitors: [
      {
        id: "v1",
        firstName: "John",
        lastName: "Smith",
        name: "John Smith",
        email: "john.smith@techcorp.com",
        phone: "+1-555-0101",
        company: "TechCorp",
        wifiRequired: true,
        meetingId: "m1",
        status: "scheduled",
        scheduledTime: new Date("2025-09-17T14:00:00"),
        visitDetails: {
          employeeName: "Alice Johnson",
          employeeEmail: "alice@company.com",
          department: "Sales",
          purpose: "Product Demo",
          scheduledTime: new Date("2025-09-17T14:00:00"),
          estimatedDuration: 60
        },
        createdAt: new Date("2025-09-16T10:00:00"),
        updatedAt: new Date("2025-09-16T10:00:00")
      }
    ],
    status: "scheduled",
    approvalStatus: "pending",
    createdAt: new Date("2025-09-16T10:00:00"),
    updatedAt: new Date("2025-09-16T10:00:00")
  },
  {
    id: "m2",
    subject: "Technical Architecture Review",
    description: "Review of system architecture and technical implementation",
    type: mockMeetingTypes[3], // Project Review
    country: "United States",
    location: mockLocations[0],
    tower: "Tower B",
    room: mockLocations[0].towers[1].rooms[0], // Room B1
    startTime: new Date("2025-09-17T15:30:00"),
    endTime: new Date("2025-09-17T17:00:00"),
    employeeId: "e2",
    employee: mockEmployees[1],
    visitors: [
      {
        id: "v2",
        firstName: "Sarah",
        lastName: "Wilson",
        name: "Sarah Wilson",
        email: "sarah.wilson@innovatelabs.com",
        phone: "+1-555-0102",
        company: "InnovateLabs",
        wifiRequired: false,
        meetingId: "m2",
        status: "checked-in",
        scheduledTime: new Date("2025-09-17T15:30:00"),
        visitDetails: {
          employeeName: "Bob Chen",
          employeeEmail: "bob@company.com",
          department: "Engineering",
          purpose: "Technical Discussion",
          scheduledTime: new Date("2025-09-17T15:30:00"),
          estimatedDuration: 90
        },
        createdAt: new Date("2025-09-16T11:30:00"),
        updatedAt: new Date("2025-09-17T15:25:00")
      }
    ],
    status: "in-progress",
    approvalStatus: "approved",
    approvedBy: "security-001",
    approvedAt: new Date("2025-09-17T09:00:00"),
    createdAt: new Date("2025-09-16T11:30:00"),
    updatedAt: new Date("2025-09-17T15:30:00")
  },
  {
    id: "m3",
    subject: "Marketing Strategy Session",
    description: "Quarterly marketing strategy planning and campaign review",
    type: mockMeetingTypes[0], // General Meeting
    country: "United States",
    location: mockLocations[0],
    tower: "Tower A",
    room: mockLocations[0].towers[0].rooms[2], // Room A3
    startTime: new Date("2025-09-17T09:00:00"),
    endTime: new Date("2025-09-17T10:30:00"),
    employeeId: "e3",
    employee: mockEmployees[2],
    visitors: [],
    status: "completed",
    approvalStatus: "approved",
    approvedBy: "security-002",
    approvedAt: new Date("2025-09-16T14:00:00"),
    createdAt: new Date("2025-09-15T16:00:00"),
    updatedAt: new Date("2025-09-17T10:30:00")
  },
  {
    id: "m4",
    subject: "Client Onboarding Workshop",
    description: "Comprehensive onboarding session for new enterprise clients",
    type: mockMeetingTypes[4], // Training Session
    country: "United States",
    location: mockLocations[1],
    tower: "Main Building",
    room: mockLocations[1].towers[0].rooms[0], // Innovation Lab
    startTime: new Date("2025-09-18T10:00:00"),
    endTime: new Date("2025-09-18T12:00:00"),
    employeeId: "e1",
    employee: mockEmployees[0],
    visitors: [
      {
        id: "v3",
        firstName: "Mike",
        lastName: "Davis",
        name: "Mike Davis",
        email: "mike@startupx.com",
        phone: "+1-555-0103",
        company: "StartupX",
        wifiRequired: true,
        meetingId: "m4",
        status: "scheduled",
        scheduledTime: new Date("2025-09-18T10:00:00"),
        visitDetails: {
          employeeName: "Alice Johnson",
          employeeEmail: "alice@company.com",
          department: "Sales",
          purpose: "Client Onboarding",
          scheduledTime: new Date("2025-09-18T10:00:00"),
          estimatedDuration: 120
        },
        createdAt: new Date("2025-09-16T13:00:00"),
        updatedAt: new Date("2025-09-16T13:00:00")
      },
      {
        id: "v4",
        firstName: "Emma",
        lastName: "Brown",
        name: "Emma Brown",
        email: "emma@designco.com",
        phone: "+1-555-0104",
        company: "DesignCo",
        wifiRequired: false,
        meetingId: "m4",
        status: "scheduled",
        scheduledTime: new Date("2025-09-18T10:00:00"),
        visitDetails: {
          employeeName: "Alice Johnson",
          employeeEmail: "alice@company.com",
          department: "Sales",
          purpose: "Client Onboarding",
          scheduledTime: new Date("2025-09-18T10:00:00"),
          estimatedDuration: 120
        },
        createdAt: new Date("2025-09-16T13:00:00"),
        updatedAt: new Date("2025-09-16T13:00:00")
      }
    ],
    status: "scheduled",
    approvalStatus: "approved",
    approvedBy: "security-001",
    approvedAt: new Date("2025-09-17T11:00:00"),
    createdAt: new Date("2025-09-16T13:00:00"),
    updatedAt: new Date("2025-09-17T11:00:00")
  },
  {
    id: "m5",
    subject: "Engineering Sprint Planning",
    description: "Sprint planning for Q4 development roadmap",
    type: mockMeetingTypes[3], // Project Review
    country: "United States",
    location: mockLocations[0],
    tower: "Tower B",
    room: mockLocations[0].towers[1].rooms[1], // Room B2
    startTime: new Date("2025-09-18T14:00:00"),
    endTime: new Date("2025-09-18T16:00:00"),
    employeeId: "e2",
    employee: mockEmployees[1],
    visitors: [],
    status: "scheduled",
    approvalStatus: "pending",
    createdAt: new Date("2025-09-17T08:00:00"),
    updatedAt: new Date("2025-09-17T08:00:00")
  },
  {
    id: "m6",
    subject: "Partnership Discussion",
    description: "Exploring strategic partnership opportunities",
    type: mockMeetingTypes[1], // Ad-Hoc Meeting
    country: "United States",
    location: mockLocations[1],
    tower: "Main Building",
    room: mockLocations[1].towers[0].rooms[1], // Executive Suite
    startTime: new Date("2025-09-19T11:00:00"),
    endTime: new Date("2025-09-19T12:30:00"),
    employeeId: "e3",
    employee: mockEmployees[2],
    visitors: [],
    status: "scheduled",
    approvalStatus: "approved",
    approvedBy: "security-003",
    approvedAt: new Date("2025-09-17T16:00:00"),
    createdAt: new Date("2025-09-17T10:00:00"),
    updatedAt: new Date("2025-09-17T16:00:00")
  },
  {
    id: "m7",
    subject: "Sales Team Standup",
    description: "Weekly sales team standup meeting",
    type: mockMeetingTypes[0], // General Meeting
    country: "United States",
    location: mockLocations[0],
    tower: "Tower A",
    room: mockLocations[0].towers[0].rooms[1], // Room A2
    startTime: new Date("2025-09-16T09:00:00"),
    endTime: new Date("2025-09-16T09:30:00"),
    employeeId: "e1",
    employee: mockEmployees[0],
    visitors: [],
    status: "completed",
    approvalStatus: "approved",
    approvedBy: "security-001",
    approvedAt: new Date("2025-09-15T12:00:00"),
    createdAt: new Date("2025-09-15T10:00:00"),
    updatedAt: new Date("2025-09-16T09:30:00")
  },
  {
    id: "m8",
    subject: "System Security Audit",
    description: "Quarterly security audit and vulnerability assessment",
    type: mockMeetingTypes[3], // Project Review
    country: "United States",
    location: mockLocations[0],
    tower: "Tower B",
    room: mockLocations[0].towers[1].rooms[0], // Room B1
    startTime: new Date("2025-09-19T08:00:00"),
    endTime: new Date("2025-09-19T10:00:00"),
    employeeId: "e2",
    employee: mockEmployees[1],
    visitors: [],
    status: "scheduled",
    approvalStatus: "pending",
    createdAt: new Date("2025-09-17T12:00:00"),
    updatedAt: new Date("2025-09-17T12:00:00")
  },
  {
    id: "m9",
    subject: "New Product Launch Planning",
    description: "Strategic planning session for upcoming product launch",
    type: mockMeetingTypes[2], // Client Presentation
    country: "United States",
    location: mockLocations[1],
    tower: "Main Building",
    room: mockLocations[1].towers[0].rooms[0], // Innovation Lab
    startTime: new Date("2025-09-20T13:00:00"),
    endTime: new Date("2025-09-20T15:00:00"),
    employeeId: "e3",
    employee: mockEmployees[2],
    visitors: [],
    status: "scheduled",
    approvalStatus: "approved",
    approvedBy: "security-002",
    approvedAt: new Date("2025-09-17T14:00:00"),
    createdAt: new Date("2025-09-17T09:00:00"),
    updatedAt: new Date("2025-09-17T14:00:00")
  },
  {
    id: "m10",
    subject: "Customer Feedback Review",
    description: "Analysis of recent customer feedback and improvement strategies",
    type: mockMeetingTypes[0], // General Meeting
    country: "United States",
    location: mockLocations[0],
    tower: "Tower A",
    room: mockLocations[0].towers[0].rooms[2], // Room A3
    startTime: new Date("2025-09-15T16:00:00"),
    endTime: new Date("2025-09-15T17:30:00"),
    employeeId: "e1",
    employee: mockEmployees[0],
    visitors: [],
    status: "completed",
    approvalStatus: "approved",
    approvedBy: "security-001",
    approvedAt: new Date("2025-09-15T08:00:00"),
    createdAt: new Date("2025-09-14T14:00:00"),
    updatedAt: new Date("2025-09-15T17:30:00")
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
    meetingId: "m1",
    wifiRequired: true,
    idDocument: {
      type: "Driver's License",
      number: "DL123456789",
      imageUrl: "/api/placeholder/200/120"
    },
    visitDetails: {
      employeeName: "Alice Johnson",
      employeeEmail: "alice@company.com",
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
    updatedAt: new Date("2024-08-26T10:00:00"),
    name: "John Smith",
    scheduledTime: new Date("2024-08-27T14:00:00")
  },
  {
    id: "v2",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@innovatelabs.com",
    phone: "+1-555-0102",
    company: "InnovateLabs",
    photoUrl: "/api/placeholder/60/60",
    meetingId: "m2",
    wifiRequired: false,
    visitDetails: {
      employeeName: "Bob Chen",
      employeeEmail: "bob@company.com",
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
    updatedAt: new Date("2024-08-27T15:25:00"),
    name: "Sarah Wilson",
    scheduledTime: new Date("2024-08-27T15:30:00")
  },
  {
    id: "v3",
    firstName: "Mike",
    lastName: "Davis",
    email: "mike@startupx.com",
    phone: "+1-555-0103",
    company: "StartupX",
    photoUrl: "/api/placeholder/60/60",
    wifiRequired: true,
    visitDetails: {
      employeeName: "Carol White",
      employeeEmail: "carol@company.com",
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
    updatedAt: new Date("2024-08-27T11:55:00"),
    name: "Mike Davis",
    scheduledTime: new Date("2024-08-27T12:00:00")
  },
  {
    id: "v4",
    firstName: "Emma",
    lastName: "Brown",
    email: "emma@designco.com",
    phone: "+1-555-0104",
    company: "DesignCo",
    wifiRequired: false,
    visitDetails: {
      employeeName: "Alice Johnson",
      employeeEmail: "alice@company.com",
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
    updatedAt: new Date("2024-08-26T11:15:00"),
    name: "Emma Brown",
    scheduledTime: new Date("2024-08-26T10:00:00")
  }
]

// Mock Visit Sessions
export const mockVisitSessions: VisitSession[] = [
  {
    id: "vs1",
    visitorId: "v1", 
    employeeId: "e1",
    meetingId: "m1",
    scheduledTime: new Date("2024-08-27T14:00:00"),
    status: "scheduled",
    badgeNumber: "B001"
  },
  {
    id: "vs2",
    visitorId: "v2",
    employeeId: "e2",
    meetingId: "m2", 
    scheduledTime: new Date("2024-08-27T15:30:00"),
    actualStartTime: new Date("2024-08-27T15:25:00"),
    status: "in-progress",
    badgeNumber: "B002"
  },
  {
    id: "vs3",
    visitorId: "v3",
    employeeId: "e3",
    scheduledTime: new Date("2024-08-27T12:00:00"),
    actualStartTime: new Date("2024-08-27T11:55:00"),
    status: "in-progress",
    badgeNumber: "B003",
    notes: "Visitor exceeded scheduled time"
  },
  {
    id: "vs4",
    visitorId: "v4",
    employeeId: "e1",
    scheduledTime: new Date("2024-08-26T10:00:00"), 
    actualStartTime: new Date("2024-08-26T09:58:00"),
    actualEndTime: new Date("2024-08-26T11:15:00"),
    status: "completed",
    badgeNumber: "B004",
    feedback: {
      rating: 5,
      comment: "Excellent meeting, very productive discussion",
      submitted: new Date("2024-08-26T12:00:00")
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
  averageVisitDuration: 75, // minutes
  totalMeetings: 45,
  meetingsInProgress: 3,
  todaysMeetings: 12,
  pendingApprovals: 5
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

export const getEmployeeById = (id: string) => {
  return mockEmployees.find(employee => employee.id === id)
}
