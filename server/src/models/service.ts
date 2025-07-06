import { DataTypes, Model } from 'sequelize';
import User from './user';

// Service interface
export interface IService {
    id?: string;
    title: string;
    description: string;
    image?: string;
    owner: User;
  }
  
  class Service extends Model<IService> implements IService {
    public id!: string;
    public title!: string;
    public description!: string;
    public image!: string;
    public owner!: User;
  }


  export default Service