export interface Visitor {
  name: string;
  scheduledTime: string | number | Date;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  photoUrl?: string;
  meetingId?: string; // Reference to meeting
  wifiRequired?: boolean;
  idDocument?: {
    type: string;
    number: string;
    imageUrl?: string;
  };
  visitDetails: {
    employeeName: string;
    employeeEmail: string;
    department: string;
    purpose: string;
    scheduledTime: Date;
    estimatedDuration: number; // in minutes
    meetingLocation?: string;
    specialRequests?: string;
  };
  status: 'scheduled' | 'pre-registered' | 'checked-in' | 'in-meeting' | 'checked-out' | 'overdue';
  badgeId?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  title: string;
  avatarUrl?: string;
  locationId?: string;
}

export interface Meeting {
  id: string;
  subject: string;
  description: string;
  type: MeetingType;
  country: string;
  location: Location;
  tower: string;
  room: Room;
  startTime: Date;
  endTime: Date;
  employeeId: string;
  employee: Employee;
  visitors: Visitor[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingType {
  id: string;
  name: string;
  description?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  country: string;
  towers: Tower[];
}

export interface Tower {
  id: string;
  name: string;
  locationId: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  towerId: string;
  capacity?: number;
  features?: string[];
}

export interface VisitSession {
  id: string;
  visitorId: string;
  employeeId: string;
  meetingId?: string;
  scheduledTime: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  badgeNumber?: string;
  notes?: string;
  feedback?: {
    rating: number;
    comment?: string;
    submitted: Date;
  };
}

export interface SecurityAlert {
  id: string;
  type: 'overdue' | 'unauthorized-area' | 'missing-badge' | 'emergency';
  visitorId?: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
}

export interface DashboardStats {
  totalVisitors: number;
  activeVisitors: number;
  scheduledToday: number;
  checkedInToday: number;
  overdueVisitors: number;
  averageVisitDuration: number;
  totalMeetings: number;
  meetingsInProgress: number;
  todaysMeetings: number;
  pendingApprovals: number;
}

export interface SecurityUser {
  id: string;
  name: string;
  email: string;
  locationId: string;
  location: Location;
  role: 'security' | 'admin';
  permissions: string[];
}
