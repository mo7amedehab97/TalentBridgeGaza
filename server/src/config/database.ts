import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load the correct .env file based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString as string, {
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This is needed for some cloud providers
    }
  }
});

export default sequelize; 