import pool from '../config/database';

const testDatabase = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection successful! Current time:', result.rows[0].now);
    
    // Query users
    const users = await pool.query('SELECT * FROM users');
    console.log('\nUsers in database:');
    console.log(users.rows);
    
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    process.exit();
  }
};

testDatabase(); 