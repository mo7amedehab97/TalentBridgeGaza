import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import IRecruiter from "../../utils/types/IRecruiter";

  class Recruiter extends Model<IRecruiter> implements IRecruiter {
    public userId!: number;
    public companyName!: string;
    public companyTitle!: string;
    public description!: string;
    public imageUrl!: string;
  }

  Recruiter.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      companyTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Recruiter',
      tableName: 'recruiters',
      timestamps: true,
      underscored: true,
    }
  );

  export default Recruiter;