import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import morgan from 'morgan';
import fareRoutes from './routes/fareRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Logger Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sample route
app.get('/', (req, res) => {
  res.send('Mobiiwrap API is running...');
});

// Error Handling Middleware
app.use('/api/fare', fareRoutes);
// Use feedback routes
app.use('/api/feedback', feedbackRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
