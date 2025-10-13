// Full Description:
// You are tasked with implementing a performance monitoring system in NodeJS for tracking API response times. The system should log the response times of each API request and generate alerts if the response time exceeds a certain threshold.
// Specific Requirements:
// Implement a simple NodeJS server with multiple API endpoints.
// Integrate a middleware function to log the response time of each request.
// Implement a mechanism to generate an alert (e.g., log a warning message) if the response time exceeds a predefined threshold (e.g., 200ms).
// Provide a way to aggregate the response time logs and generate a simple report showing the average response time for each endpoint.
// Evaluation Criteria:
// Correctness: The monitoring system must accurately log and report response times.
// Code Quality: The implementation should be modular, well-documented, and easy to extend.
// Efficiency: The monitoring system should not significantly impact the server's performance.

const express = require('express');
const app = express();
const port = 3000;
const threshold = 200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const end = Date.now();
    const responseTime = end - start;
    if (responseTime > threshold) {
      console.warn(`Response time exceeded threshold: ${responseTime}ms`);
    }
  });
  next();
});
app.get('/api/users', (req, res) => {
  setTimeout(() => {
    res.json({ users: [] });
  }, 100);
});

app.get('/api/posts', (req, res) => {
  setTimeout(() => {
    res.json({ posts: [] });
  }, 300);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
