import cron from 'node-cron';
import hikvisionService from '../services/hikvisionService.js';
import TrafficData from '../models/TrafficData.js';
import Visitor from '../models/Visitor.js';

class DataSyncJob {
  constructor() {
    this.isRunning = false;
  }

  // Start the data synchronization job
  start() {
    console.log('Starting data synchronization job...');
    
    // Run every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      if (this.isRunning) {
        console.log('Data sync already running, skipping...');
        return;
      }

      try {
        this.isRunning = true;
        await this.syncTrafficData();
      } catch (error) {
        console.error('Error in data sync job:', error);
      } finally {
        this.isRunning = false;
      }
    });

    // Initial sync
    this.syncTrafficData();
  }

  // Sync traffic data from Hikvision cameras
  async syncTrafficData() {
    try {
      console.log('Syncing traffic data from Hikvision cameras...');
      
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 10 * 60 * 1000); // Last 10 minutes

      const anprEvents = await hikvisionService.getANPREvents(startTime, endTime);
      
      for (const event of anprEvents) {
        await this.processANPREvent(event);
      }

      console.log(`Processed ${anprEvents.length} ANPR events`);
    } catch (error) {
      console.error('Error syncing traffic data:', error);
    }
  }

  // Process individual ANPR event
  async processANPREvent(event) {
    try {
      // Check if this event already exists
      const existingRecord = await TrafficData.findOne({
        plateNumber: event.plateNumber,
        entryTime: event.entryTime
      });

      if (existingRecord) {
        // Update exit time if this is an exit event
        if (event.exitTime && !existingRecord.exitTime) {
          existingRecord.exitTime = event.exitTime;
          existingRecord.status = 'out';
          await existingRecord.save();
        }
        return;
      }

      // Check if visitor is registered
      const visitor = await Visitor.findOne({ plateNumber: event.plateNumber });
      
      if (visitor) {
        event.visitorName = visitor.name;
        event.visitorType = visitor.type;
        
        // Update visitor's last visit
        visitor.lastVisit = event.entryTime;
        visitor.totalVisits += 1;
        await visitor.save();
      }

      // Create new traffic record
      const trafficRecord = new TrafficData(event);
      await trafficRecord.save();

      console.log(`Created traffic record for plate: ${event.plateNumber}`);
    } catch (error) {
      console.error('Error processing ANPR event:', error);
    }
  }

  // Generate sample data for testing
  async generateSampleData() {
    try {
      console.log('Generating sample traffic data...');
      
      const sampleEvents = await hikvisionService.getMockANPRData();
      
      for (const event of sampleEvents) {
        await this.processANPREvent(event);
      }

      console.log('Sample data generated successfully');
    } catch (error) {
      console.error('Error generating sample data:', error);
    }
  }
}

export default new DataSyncJob();