import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public readonly created_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully!');
    
    // Create test users
    await User.bulkCreate([
      { name: 'Test User 1', email: 'test1@example.com' },
      { name: 'Test User 2', email: 'test2@example.com' },
      { name: 'Test User 3', email: 'test3@example.com' }
    ]);
    
    console.log('Test users created successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default User; 