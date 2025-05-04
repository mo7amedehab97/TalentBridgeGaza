import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'talent_bridge_db',
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This is needed for some cloud providers
    }
  }
});

export default sequelize; 