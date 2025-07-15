import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import IJopPost from '../../utils/types/IJopPost';

class JopPost extends Model<IJopPost> implements IJopPost {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public location!: string;
  public salaryRange!: string;
  public contractTypeId!: number;
  public skillsRequired!: string;
  public status!: string;
}

JopPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salaryRange: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contractTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contract_types',
        key: 'id',
      },
    },
    skillsRequired: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'JopPost',
    tableName: 'jop_posts',
    timestamps: true,
    underscored: true,
  }
);

export default JopPost;