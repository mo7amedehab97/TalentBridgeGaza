// models/contractType.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import IContractType from '../../utils/types/IContractType';


class ContractType extends Model<IContractType> implements IContractType {
  public id!: number;
  public name!: string;
}

ContractType.init(
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
    modelName: 'ContractType',
    tableName: 'contract_types',
    timestamps: true,
    underscored: true,
  }
);

export default ContractType;
