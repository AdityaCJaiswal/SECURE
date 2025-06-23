export interface TrafficData {
  _id: string;
  plateNumber: string;
  vehicleType: string;
  entryTime: string;
  exitTime?: string;
  status: 'in' | 'out';
  visitorName?: string;
  visitorType: 'faculty' | 'student' | 'worker' | 'stranger';
  cameraLocation: string;
  confidence: number;
  createdAt: string;
}

export interface DashboardStats {
  weeklyTraffic: number;
  newRegistrations: number;
  newTraffic: number;
  totalTraffic: number;
  newVisitors: number;
  repeatCustomers: number;
  knownVisitors: number;
  unknownVisitors: number;
}

export interface TrafficAnalytics {
  hourlyData: Array<{
    hour: string;
    count: number;
  }>;
  weeklyData: Array<{
    day: string;
    count: number;
  }>;
  visitorTypeDistribution: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

export interface CalendarData {
  date: string;
  count: number;
  events?: string[];
}