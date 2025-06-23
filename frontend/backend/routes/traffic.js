import express from 'express';
import TrafficData from '../models/TrafficData.js';

const router = express.Router();

// Get traffic data with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      TrafficData.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TrafficData.countDocuments()
    ]);

    res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    res.status(500).json({ error: 'Failed to fetch traffic data' });
  }
});

// Get specific traffic record
router.get('/:id', async (req, res) => {
  try {
    const trafficData = await TrafficData.findById(req.params.id);
    if (!trafficData) {
      return res.status(404).json({ error: 'Traffic record not found' });
    }
    res.json(trafficData);
  } catch (error) {
    console.error('Error fetching traffic record:', error);
    res.status(500).json({ error: 'Failed to fetch traffic record' });
  }
});

// Create new traffic record
router.post('/', async (req, res) => {
  try {
    const trafficData = new TrafficData(req.body);
    await trafficData.save();
    res.status(201).json(trafficData);
  } catch (error) {
    console.error('Error creating traffic record:', error);
    res.status(400).json({ error: 'Failed to create traffic record' });
  }
});

// Update traffic record (for exit time)
router.put('/:id', async (req, res) => {
  try {
    const trafficData = await TrafficData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trafficData) {
      return res.status(404).json({ error: 'Traffic record not found' });
    }
    
    res.json(trafficData);
  } catch (error) {
    console.error('Error updating traffic record:', error);
    res.status(400).json({ error: 'Failed to update traffic record' });
  }
});

export default router;