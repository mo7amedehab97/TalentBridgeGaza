import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import Talent from './models/Talent';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '5000');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/talents', async (req, res) => {
  try {
    const talents = await Talent.findAll();
    res.json(talents);
  } catch (error) {
    console.error('Error fetching talents:', error);
    res.status(500).json({ error: 'Failed to fetch talents' });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed:', error.message);
  }); 