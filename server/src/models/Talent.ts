import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Talent extends Model {
  public talent_id!: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public bio!: string | null;
  public location!: string | null;
  public availability!: 'full-time' | 'part-time' | 'unavailable';
  public hourly_rate!: number | null;
  public profile_picture_url!: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Talent.init(
  {
    talent_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    availability: {
      type: DataTypes.ENUM('full-time', 'part-time', 'unavailable'),
      allowNull: false,
      defaultValue: 'full-time',
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'talents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Talent; 