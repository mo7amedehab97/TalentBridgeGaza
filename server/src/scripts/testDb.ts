import sequelize from '../config/database';
import User from '../models/user';

const testDatabase = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection successful!');
    
    // Query users
    const users = await User.findAll();
    console.log('\nUsers in database:');
    console.log(JSON.stringify(users, null, 2));
    
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    process.exit();
  }
};

testDatabase(); 