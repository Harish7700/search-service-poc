const express = require('express');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', searchRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Search service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Search service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Search API: http://localhost:${PORT}/api/search?q=<query>`);
});

module.exports = app;
