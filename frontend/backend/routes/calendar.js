import express from 'express';
import analyticsService from '../services/analyticsService.js';

const router = express.Router();

// Get calendar data
router.get('/', async (req, res) => {
  try {
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();
    
    const calendarData = await analyticsService.getCalendarData(month, year);
    res.json(calendarData);
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
});

export default router;