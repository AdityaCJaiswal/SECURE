import express from 'express';
import analyticsService from '../services/analyticsService.js';

const router = express.Router();

// Get traffic analytics
router.get('/traffic', async (req, res) => {
  try {
    const period = req.query.period || '7d';
    const analytics = await analyticsService.getTrafficAnalytics(period);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching traffic analytics:', error);
    res.status(500).json({ error: 'Failed to fetch traffic analytics' });
  }
});

export default router;