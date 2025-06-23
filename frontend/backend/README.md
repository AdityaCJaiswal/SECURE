# Smart Campus Backend

Backend service for the Smart Campus Entry and Security Insight System with ANPR camera integration.

## Features

- **Real-time ANPR Data Processing**: Integrates with Hikvision cameras to capture and process license plate data
- **MongoDB Integration**: Stores traffic data, visitor information, and analytics
- **RESTful API**: Provides endpoints for dashboard, analytics, and data export
- **Automated Data Sync**: Background jobs to sync data from ANPR cameras
- **Export Functionality**: Export data in CSV and PDF formats
- **Analytics Engine**: Real-time traffic analytics and insights

## Prerequisites

Before running the backend, you need:

1. **MongoDB Atlas Account**: 
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Whitelist your IP address

2. **Hikvision ANPR Camera** (for production):
   - Camera IP address
   - Admin username and password
   - Network access to the camera

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```env
   # MongoDB Configuration
   <!-- MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-campus -->

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Hikvision Camera Configuration (Required for production)
   HIKVISION_IP=192.168.1.100
   HIKVISION_USERNAME=admin
   HIKVISION_PASSWORD=your_camera_password
   HIKVISION_PORT=80

   # API Configuration
   API_SECRET_KEY=your-secret-key-here
   CORS_ORIGIN=http://localhost:5173
   ```

## Required Setup from Your Side

### 1. MongoDB Atlas Setup
- Create a MongoDB Atlas account at https://cloud.mongodb.com
- Create a new cluster (free tier is sufficient for testing)
- Create a database user with read/write permissions
- Get your connection string and update `MONGODB_URI` in `.env`

### 2. Hikvision ANPR Camera Configuration
For production use, you need to provide:
- **Camera IP Address**: The local network IP of your Hikvision ANPR camera
- **Admin Credentials**: Username and password for camera access
- **Network Access**: Ensure the server can reach the camera on the network
- **ANPR Feature**: Ensure your Hikvision camera has ANPR (Automatic Number Plate Recognition) enabled

### 3. Camera API Endpoints
The system expects these Hikvision API endpoints to be available:
- `/ISAPI/Traffic/channels/1/vehicleDetect` - For ANPR events
- `/ISAPI/System/status` - For camera status

## Running the Application

1. **Development Mode**:
   ```bash
   npm run dev
   ```

2. **Production Mode**:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Traffic Data
- `GET /api/traffic` - Get paginated traffic data
- `GET /api/traffic/:id` - Get specific traffic record
- `POST /api/traffic` - Create new traffic record
- `PUT /api/traffic/:id` - Update traffic record

### Analytics
- `GET /api/analytics/traffic?period=7d` - Get traffic analytics

### Calendar
- `GET /api/calendar?month=1&year=2024` - Get calendar data

### Export
- `GET /api/export?format=csv` - Export data as CSV
- `GET /api/export?format=pdf` - Export data as PDF

### Health Check
- `GET /api/health` - Server health status

## Data Models

### TrafficData
- Plate number, vehicle type, entry/exit times
- Visitor information and type classification
- Camera location and confidence score
- Duration calculation

### Visitor
- Registered visitor information
- Plate number mapping
- Visit history and statistics

## Background Jobs

The system runs automated background jobs:

1. **Data Sync Job**: Runs every 5 minutes to fetch new ANPR events from cameras
2. **Sample Data Generation**: In development mode, generates mock data for testing

## Development vs Production

### Development Mode
- Uses mock ANPR data for testing
- Generates sample traffic data automatically
- Relaxed error handling for easier debugging

### Production Mode
- Connects to real Hikvision cameras
- Strict error handling and logging
- Optimized for performance

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Verify your connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

2. **Camera Connection Failed**:
   - Verify camera IP address and credentials
   - Check network connectivity
   - Ensure ANPR feature is enabled on camera

3. **CORS Issues**:
   - Update `CORS_ORIGIN` in `.env` to match your frontend URL

## Security Considerations

- Store sensitive credentials in environment variables
- Use HTTPS in production
- Implement proper authentication for API endpoints
- Regularly update dependencies
- Monitor camera access logs

## Support

For issues related to:
- **Hikvision Camera Setup**: Consult your camera documentation or Hikvision support
- **MongoDB Atlas**: Check MongoDB Atlas documentation
- **Application Issues**: Check server logs and error messages