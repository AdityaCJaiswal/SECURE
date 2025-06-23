import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class HikvisionService {
  constructor() {
    this.baseURL = `http://${process.env.HIKVISION_IP}:${process.env.HIKVISION_PORT}`;
    this.username = process.env.HIKVISION_USERNAME;
    this.password = process.env.HIKVISION_PASSWORD;
    
    this.client = axios.create({
      baseURL: this.baseURL,
      auth: {
        username: this.username,
        password: this.password
      },
      timeout: 10000
    });
  }

  // Get ANPR events from Hikvision camera
  async getANPREvents(startTime, endTime) {
    try {
      const response = await this.client.get('/ISAPI/Traffic/channels/1/vehicleDetect', {
        params: {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          maxResults: 100
        }
      });

      return this.parseANPRData(response.data);
    } catch (error) {
      console.error('Error fetching ANPR events:', error.message);
      // Return mock data for development
      return this.getMockANPRData();
    }
  }

  // Parse ANPR data from Hikvision format
  parseANPRData(data) {
    // This would parse the actual Hikvision XML/JSON response
    // For now, returning mock data structure
    return this.getMockANPRData();
  }

  // Mock ANPR data for development/testing
  getMockANPRData() {
    const mockPlates = [
      'RZ1730B', 'RZ8308', 'RZ8765', 'DL01AB1234', 'MH12CD5678',
      'KA03EF9012', 'TN09GH3456', 'GJ05IJ7890', 'UP16KL2345', 'WB07MN6789'
    ];
    
    const visitorTypes = ['faculty', 'student', 'worker', 'stranger'];
    const visitorNames = [
      'Aditya Jaiswal', 'Sejal Sharma', 'Akshat Kumar', 'Priya Singh', 'Rahul Verma',
      'Sneha Patel', 'Vikash Gupta', 'Anita Rao', 'Suresh Nair', 'Kavya Reddy'
    ];
    
    const locations = ['Main Gate', 'Side Gate', 'Parking Gate A', 'Parking Gate B'];

    const events = [];
    const now = new Date();

    for (let i = 0; i < 20; i++) {
      const entryTime = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
      const hasExited = Math.random() > 0.3;
      const exitTime = hasExited ? new Date(entryTime.getTime() + Math.random() * 8 * 60 * 60 * 1000) : null;

      events.push({
        plateNumber: mockPlates[Math.floor(Math.random() * mockPlates.length)],
        vehicleType: 'car',
        entryTime,
        exitTime,
        status: hasExited ? 'out' : 'in',
        visitorName: visitorNames[Math.floor(Math.random() * visitorNames.length)],
        visitorType: visitorTypes[Math.floor(Math.random() * visitorTypes.length)],
        cameraLocation: locations[Math.floor(Math.random() * locations.length)],
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
      });
    }

    return events;
  }

  // Get camera status
  async getCameraStatus() {
    try {
      const response = await this.client.get('/ISAPI/System/status');
      return {
        online: true,
        status: 'active',
        lastUpdate: new Date()
      };
    } catch (error) {
      return {
        online: false,
        status: 'offline',
        lastUpdate: new Date(),
        error: error.message
      };
    }
  }
}

export default new HikvisionService();