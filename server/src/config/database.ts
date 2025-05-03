import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('talent_bridge_gaza', 'mohamed', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize; 