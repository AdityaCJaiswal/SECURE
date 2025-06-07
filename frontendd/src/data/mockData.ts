export interface VisitorData {
  id: string;
  visitor: string;
  date: string;
  inTime: string;
  outTime: string | null;
  status: "In" | "Out";
}

export interface TrafficData {
  month: string;
  toys: number;
  animalCare: number;
}

export interface WeeklyTrafficData {
  day: string;
  value: number;
  color: string;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export const visitorData: VisitorData[] = [
  {
    id: "RZT7308",
    visitor: "Sejal",
    date: "13/01/2025",
    inTime: "14:34:44",
    outTime: null,
    status: "In",
  },
  {
    id: "RZ8308",
    visitor: "Adi",
    date: "13/01/2025",
    inTime: "13:08:56",
    outTime: "14:12:14",
    status: "Out",
  },
  {
    id: "RZ8765",
    visitor: "Akshat",
    date: "13/01/2025",
    inTime: "13:01:34",
    outTime: "14:03:44",
    status: "Out",
  },
];

export const trafficData: TrafficData[] = [
  { month: "Jan", toys: 80, animalCare: 60 },
  { month: "Feb", toys: 120, animalCare: 90 },
  { month: "Mar", toys: 100, animalCare: 140 },
  { month: "Apr", toys: 180, animalCare: 110 },
  { month: "May", toys: 160, animalCare: 200 },
  { month: "Jun", toys: 220, animalCare: 150 },
  { month: "Jul", toys: 200, animalCare: 180 },
  { month: "Aug", toys: 240, animalCare: 160 },
  { month: "Sep", toys: 180, animalCare: 220 },
  { month: "Oct", toys: 260, animalCare: 200 },
  { month: "Nov", toys: 220, animalCare: 240 },
  { month: "Dec", toys: 280, animalCare: 180 },
];

export const weeklyTrafficData: WeeklyTrafficData[] = [
  { day: "Mon", value: 120, color: "#FF6B35" },
  { day: "Tue", value: 80, color: "#E91E63" },
  { day: "Wed", value: 100, color: "#FFC107" },
  { day: "Thu", value: 60, color: "#4CAF50" },
  { day: "Fri", value: 140, color: "#FF5722" },
  { day: "Sat", value: 90, color: "#9E9E9E" },
];

export const pieChartData: PieChartData[] = [
  { name: "Faculty", value: 35, color: "#FF6B6B" },
  { name: "Workers", value: 25, color: "#4ECDC4" },
  { name: "Students", value: 30, color: "#45B7D1" },
  { name: "Strangers", value: 10, color: "#96CEB4" },
];

export const metricCards = [
  {
    title: "Weekly Traffic",
    value: "18568",
    bgColor: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    illustration: "📊",
  },
  {
    title: "New Registrations",
    value: "750",
    bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    illustration: "👥",
  },
  {
    title: "New traffic",
    value: "2397",
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    illustration: "🚀",
  },
];

export const statsData = {
  totalTraffic: "18.5k",
  newVisitors: "2.4k",
  repeatCustomers: "16.1k",
  knownVisitors: "16.1k",
  unknownVisitors: "3.4k",
};
