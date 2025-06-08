const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

// Load and parse Excel file
const filePath = path.join(__dirname, 'data', 'VehicleInfo2025_05_23_14_35_53.xls');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Define the API endpoint
app.get('/api/vehicles', (req, res) => {
  res.json(jsonData);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/vehicles`);
});
