import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { IRole } from '../../utils/types/IRole';

class Role extends Model<IRole> implements IRole {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true,
    underscored: true,
  }
);

export default Role;

