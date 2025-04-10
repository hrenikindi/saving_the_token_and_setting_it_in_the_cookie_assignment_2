const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

// Secret key for JWT - in production use environment variable
const SECRET_KEY = 'your-secret-key-here';

app.use(express.json());

// Endpoint to generate JWT with expiry
app.post('/generate-token', (req, res) => {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };

  // Generate token with 1 hour expiry
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Endpoint to verify token
app.get('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
