import React, { useState, useEffect } from 'react';
import { Car, Users, TrendingUp, UserPlus, Activity, Shield, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';
import TrafficChart from './TrafficChart';
import WeeklyTrafficChart from './WeeklyTrafficChart';
import Calendar from './Calendar';
import VisitorTable from './VisitorTable';
import TrafficDistribution from './TrafficDistribution';
import { dashboardAPI } from '../services/api';
import type { DashboardStats, TrafficData, TrafficAnalytics } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [analytics, setAnalytics] = useState<TrafficAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, trafficResponse, analyticsData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getTrafficData(1, 10),
          dashboardAPI.getTrafficAnalytics('7d')
        ]);

        setStats(statsData);
        setTrafficData(trafficResponse.data);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback data for demo
        setStats({
          weeklyTraffic: 18568,
          newRegistrations: 750,
          newTraffic: 2397,
          totalTraffic: 18500,
          newVisitors: 2400,
          repeatCustomers: 16100,
          knownVisitors: 16100,
          unknownVisitors: 3400
        });
        setAnalytics({
          hourlyData: [
            { hour: '00', count: 120 },
            { hour: '04', count: 80 },
            { hour: '08', count: 200 },
            { hour: '12', count: 350 },
            { hour: '16', count: 280 },
            { hour: '20', count: 150 }
          ],
          weeklyData: [
            { day: 'Mon', count: 140 },
            { day: 'Tue', count: 180 },
            { day: 'Wed', count: 120 },
            { day: 'Thu', count: 200 },
            { day: 'Fri', count: 250 },
            { day: 'Sat', count: 160 }
          ],
          visitorTypeDistribution: [
            { type: 'faculty', count: 5000, percentage: 27 },
            { type: 'workers', count: 4500, percentage: 24 },
            { type: 'students', count: 6000, percentage: 32 },
            { type: 'strangers', count: 3000, percentage: 17 }
          ]
        });
        setTrafficData([
          {
            _id: '1',
            plateNumber: 'RZ1730B',
            vehicleType: 'car',
            entryTime: '2025-01-13T14:34:44.000Z',
            status: 'in',
            visitorName: 'Sejal',
            visitorType: 'faculty',
            cameraLocation: 'Main Gate',
            confidence: 95,
            createdAt: '2025-01-13T14:34:44.000Z'
          },
          {
            _id: '2',
            plateNumber: 'RZ8308',
            vehicleType: 'car',
            entryTime: '2025-01-13T13:08:56.000Z',
            exitTime: '2025-01-13T14:12:14.000Z',
            status: 'out',
            visitorName: 'Adi',
            visitorType: 'student',
            cameraLocation: 'Main Gate',
            confidence: 92,
            createdAt: '2025-01-13T13:08:56.000Z'
          },
          {
            _id: '3',
            plateNumber: 'RZ8765',
            vehicleType: 'car',
            entryTime: '2025-01-13T13:01:34.000Z',
            exitTime: '2025-01-13T14:03:44.000Z',
            status: 'out',
            visitorName: 'Akshat',
            visitorType: 'worker',
            cameraLocation: 'Side Gate',
            confidence: 88,
            createdAt: '2025-01-13T13:01:34.000Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = async () => {
    try {
      await dashboardAPI.exportData('csv');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Aditya</h1>
              <p className="text-gray-300">Here's what's happening at your campus today</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All Systems Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Traffic Today"
            value={stats?.newTraffic.toLocaleString() || '2,397'}
            subtitle="+12% from yesterday"
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            icon={<Car className="w-8 h-8" />}
          />
          <StatsCard
            title="Active Visitors"
            value="1,234"
            subtitle="Currently on campus"
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
            icon={<Users className="w-8 h-8" />}
          />
          <StatsCard
            title="New Registrations"
            value={stats?.newRegistrations || '750'}
            subtitle="This week"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            icon={<UserPlus className="w-8 h-8" />}
          />
          <StatsCard
            title="Security Alerts"
            value="3"
            subtitle="Requires attention"
            bgColor="bg-gradient-to-br from-orange-500 to-red-500"
            icon={<AlertTriangle className="w-8 h-8" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Traffic Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="h-96">
              <TrafficChart data={analytics?.hourlyData || []} />
            </div>
          </div>

          {/* Traffic Distribution */}
          <div className="lg:col-span-1">
            <div className="h-96">
              <TrafficDistribution data={analytics?.visitorTypeDistribution || []} />
            </div>
          </div>
        </div>

        {/* Secondary Charts - Fixed Heights and Proper Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96">
            <WeeklyTrafficChart data={analytics?.weeklyData || []} />
          </div>
          <div className="h-96">
            <Calendar />
          </div>
        </div>

        {/* Visitor Table - Separate Section */}
        <div className="w-full">
          <VisitorTable data={trafficData} onExport={handleExport} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;