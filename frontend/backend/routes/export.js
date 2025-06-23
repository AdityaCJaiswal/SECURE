import express from 'express';
import TrafficData from '../models/TrafficData.js';
import createCsvWriter from 'csv-writer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Export data as CSV or PDF
router.get('/', async (req, res) => {
  try {
    const format = req.query.format || 'csv';
    const startDate = req.query.start ? new Date(req.query.start) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = req.query.end ? new Date(req.query.end) : new Date();

    const data = await TrafficData.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: -1 }).lean();

    if (format === 'csv') {
      await exportToCsv(data, res);
    } else if (format === 'pdf') {
      await exportToPdf(data, res);
    } else {
      res.status(400).json({ error: 'Invalid format. Use csv or pdf' });
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

async function exportToCsv(data, res) {
  const filename = `traffic-data-${Date.now()}.csv`;
  const filepath = path.join(process.cwd(), 'temp', filename);

  // Ensure temp directory exists
  if (!fs.existsSync(path.dirname(filepath))) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
  }

  const csvWriter = createCsvWriter.createObjectCsvWriter({
    path: filepath,
    header: [
      { id: 'plateNumber', title: 'Plate Number' },
      { id: 'visitorName', title: 'Visitor Name' },
      { id: 'visitorType', title: 'Visitor Type' },
      { id: 'vehicleType', title: 'Vehicle Type' },
      { id: 'entryTime', title: 'Entry Time' },
      { id: 'exitTime', title: 'Exit Time' },
      { id: 'status', title: 'Status' },
      { id: 'cameraLocation', title: 'Camera Location' },
      { id: 'confidence', title: 'Confidence %' },
      { id: 'duration', title: 'Duration (minutes)' }
    ]
  });

  await csvWriter.writeRecords(data);

  res.download(filepath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
    }
    // Clean up temp file
    fs.unlink(filepath, (unlinkErr) => {
      if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
    });
  });
}

async function exportToPdf(data, res) {
  const doc = new PDFDocument();
  const filename = `traffic-data-${Date.now()}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  doc.pipe(res);

  // Add title
  doc.fontSize(20).text('Smart Campus Traffic Report', 50, 50);
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, 50, 80);
  doc.text(`Total Records: ${data.length}`, 50, 100);

  // Add table headers
  let yPosition = 140;
  doc.text('Plate Number', 50, yPosition);
  doc.text('Visitor', 150, yPosition);
  doc.text('Type', 250, yPosition);
  doc.text('Entry Time', 300, yPosition);
  doc.text('Status', 450, yPosition);

  yPosition += 20;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  yPosition += 10;

  // Add data rows
  data.forEach((record, index) => {
    if (yPosition > 700) {
      doc.addPage();
      yPosition = 50;
    }

    doc.text(record.plateNumber || 'N/A', 50, yPosition);
    doc.text(record.visitorName || 'Unknown', 150, yPosition);
    doc.text(record.visitorType || 'N/A', 250, yPosition);
    doc.text(new Date(record.entryTime).toLocaleString(), 300, yPosition);
    doc.text(record.status || 'N/A', 450, yPosition);

    yPosition += 20;
  });

  doc.end();
}

export default router;