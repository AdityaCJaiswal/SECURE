import axios from 'axios';
import type { TrafficData, DashboardStats, TrafficAnalytics, CalendarData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getTrafficData: async (page = 1, limit = 10): Promise<{ data: TrafficData[], total: number }> => {
    const response = await api.get(`/traffic?page=${page}&limit=${limit}`);
    return response.data;
  },

  getTrafficAnalytics: async (period = '7d'): Promise<TrafficAnalytics> => {
    const response = await api.get(`/analytics/traffic?period=${period}`);
    return response.data;
  },

  getCalendarData: async (month: string, year: string): Promise<CalendarData[]> => {
    const response = await api.get(`/calendar?month=${month}&year=${year}`);
    return response.data;
  },

  exportData: async (format: 'csv' | 'pdf', dateRange?: { start: string; end: string }) => {
    const params = new URLSearchParams();
    params.append('format', format);
    if (dateRange) {
      params.append('start', dateRange.start);
      params.append('end', dateRange.end);
    }
    
    const response = await api.get(`/export?${params.toString()}`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `traffic-data.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};