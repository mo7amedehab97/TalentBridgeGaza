import { initializeDatabase } from '../models/user';

const init = async () => {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit();
  }
};

init(); 