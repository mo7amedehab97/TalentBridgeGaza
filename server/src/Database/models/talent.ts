import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import { ITalent } from '../../utils/types/ITalent';


class Talent extends Model<ITalent> implements ITalent  {
  public userId!: number;
  public bio!: string;
  public location!: string;
  public contractTypeId!: number;
  public hourlyRate!: number;
  public yearOfExperience!: number;
  public profilePictureUrl!: string;
  public cvUrl!: string;
}

Talent.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    contractTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    yearOfExperience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    profilePictureUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cvUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    
  },
  {
    sequelize,
    modelName: 'Talent',
    tableName: 'talents',
    timestamps: true,
    underscored: true,
  }
);

export default Talent; 