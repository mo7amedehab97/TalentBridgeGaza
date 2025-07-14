import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './config/database';

const PORT = parseInt(process.env.PORT || '5000');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ force: false });
    console.log('✅ Models synced');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', (error as Error).message);
    process.exit(1);
  }
};

startServer();
