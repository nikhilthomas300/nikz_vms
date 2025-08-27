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
  idDocument?: {
    type: string;
    number: string;
    imageUrl?: string;
  };
  visitDetails: {
    hostName: string;
    hostEmail: string;
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

export interface Host {
  id: string;
  name: string;
  email: string;
  department: string;
  title: string;
  avatarUrl?: string;
}

export interface VisitSession {
  id: string;
  visitorId: string;
  hostId: string;
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
}
