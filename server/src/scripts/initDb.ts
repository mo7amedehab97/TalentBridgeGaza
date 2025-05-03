import { createUsersTable, insertTestUsers } from '../models/user';

const initializeDatabase = async () => {
  try {
    console.log('Creating users table...');
    await createUsersTable();
    
    console.log('Inserting test users...');
    await insertTestUsers();
    
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit();
  }
};

initializeDatabase(); 