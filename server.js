const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Function to generate random numbers between 1 and 6
function generateRandomNumbers(count = 5) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 6) + 1);
  }
  return numbers;
}


// Get 5 random numbers (default)
app.get('/api/random', (req, res) => {
  const numbers = generateRandomNumbers(5);
  res.json({
    numbers: numbers
  });
});




// Post endpoint for consistency
app.post('/api/random', (req, res) => {
  const { count = 5 } = req.body;
  
  if (isNaN(count) || count < 1 || count > 100) {
    return res.status(400).json({ 
      error: 'Count must be between 1 and 100' 
    });
  }
  
  const numbers = generateRandomNumbers(count);
  res.json({
    numbers: numbers
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Random Numbers API (1-6) running on port ${PORT}`);
  console.log(`GET /api/random - Get 5 random numbers (1-6)`);
});