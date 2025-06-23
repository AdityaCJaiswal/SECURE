import TrafficData from '../models/TrafficData.js';

class AnalyticsService {
  // Get dashboard statistics
  async getDashboardStats() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      weeklyTraffic,
      newRegistrations,
      newTraffic,
      totalTraffic,
      newVisitors,
      repeatCustomers,
      knownVisitors,
      unknownVisitors
    ] = await Promise.all([
      TrafficData.countDocuments({ createdAt: { $gte: weekAgo } }),
      TrafficData.countDocuments({ 
        createdAt: { $gte: weekAgo },
        visitorType: { $ne: 'stranger' }
      }),
      TrafficData.countDocuments({ 
        createdAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }
      }),
      TrafficData.countDocuments({ createdAt: { $gte: monthAgo } }),
      TrafficData.distinct('plateNumber', { 
        createdAt: { $gte: weekAgo },
        visitorType: { $ne: 'stranger' }
      }).then(plates => plates.length),
      TrafficData.aggregate([
        { $match: { createdAt: { $gte: monthAgo } } },
        { $group: { _id: '$plateNumber', count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $count: 'repeatCustomers' }
      ]).then(result => result[0]?.repeatCustomers || 0),
      TrafficData.countDocuments({ 
        createdAt: { $gte: monthAgo },
        visitorType: { $ne: 'stranger' }
      }),
      TrafficData.countDocuments({ 
        createdAt: { $gte: monthAgo },
        visitorType: 'stranger'
      })
    ]);

    return {
      weeklyTraffic,
      newRegistrations,
      newTraffic,
      totalTraffic,
      newVisitors,
      repeatCustomers,
      knownVisitors,
      unknownVisitors
    };
  }

  // Get traffic analytics for charts
  async getTrafficAnalytics(period = '7d') {
    const now = new Date();
    let startDate;

    switch (period) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const [hourlyData, weeklyData, visitorTypeDistribution] = await Promise.all([
      this.getHourlyTrafficData(startDate, now),
      this.getWeeklyTrafficData(startDate, now),
      this.getVisitorTypeDistribution(startDate, now)
    ]);

    return {
      hourlyData,
      weeklyData,
      visitorTypeDistribution
    };
  }

  // Get hourly traffic data
  async getHourlyTrafficData(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $hour: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ];

    const result = await TrafficData.aggregate(pipeline);
    
    // Fill missing hours with 0
    const hourlyData = [];
    for (let i = 0; i < 24; i += 4) {
      const hourData = result.find(item => item._id === i);
      hourlyData.push({
        hour: i.toString().padStart(2, '0'),
        count: hourData ? hourData.count : 0
      });
    }

    return hourlyData;
  }

  // Get weekly traffic data
  async getWeeklyTrafficData(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ];

    const result = await TrafficData.aggregate(pipeline);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const weeklyData = dayNames.map((day, index) => {
      const dayData = result.find(item => item._id === index + 1);
      return {
        day,
        count: dayData ? dayData.count : 0
      };
    });

    return weeklyData.slice(1).concat(weeklyData.slice(0, 1)); // Start with Monday
  }

  // Get visitor type distribution
  async getVisitorTypeDistribution(startDate, endDate) {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$visitorType',
          count: { $sum: 1 }
        }
      }
    ];

    const result = await TrafficData.aggregate(pipeline);
    const totalCount = result.reduce((sum, item) => sum + item.count, 0);

    return result.map(item => ({
      type: item._id,
      count: item.count,
      percentage: Math.round((item.count / totalCount) * 100)
    }));
  }

  // Get calendar data
  async getCalendarData(month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ];

    const result = await TrafficData.aggregate(pipeline);
    
    const calendarData = [];
    const daysInMonth = endDate.getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = result.find(item => item._id === day);
      calendarData.push({
        date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        count: dayData ? dayData.count : 0
      });
    }

    return calendarData;
  }
}

export default new AnalyticsService();