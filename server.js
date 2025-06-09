// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const data = req.body;
  const timestamp = new Date().toISOString();
  const record = { timestamp, ...data };

  fs.appendFile('results.json', JSON.stringify(record) + '\n', err => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Data saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

