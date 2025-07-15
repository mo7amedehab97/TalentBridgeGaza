// src/scripts/initDb.ts (or wherever you placed it)
import sequelize from '../../config/database';
import { initModels, Role } from '../models';

const init = async () => {
  try {
    console.log('Connecting to DB...');
    await sequelize.authenticate();
    console.log('Connection established.');

    console.log('Initializing models...');
    initModels();

    console.log('Syncing models...');
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    console.log('Database ready! ✅');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit();
  }
};

init();