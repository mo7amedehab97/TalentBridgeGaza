import pool from '../config/database';

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

export const insertTestUsers = async () => {
  const users = [
    { name: 'Test User 1', email: 'test1@example.com' },
    { name: 'Test User 2', email: 'test2@example.com' },
    { name: 'Test User 3', email: 'test3@example.com' }
  ];

  for (const user of users) {
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [user.name, user.email]
    );
  }
}; 