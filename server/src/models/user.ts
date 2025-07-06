import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import UserValidation, { ValidationError } from '../utils/validation';

// Role enum
export enum Role {
  ADMIN = 'ADMIN',
  CONTRACTOR = 'CONTRACTOR',
  CLIENT = 'CLIENT',
  COMPANY = 'COMPANY'
}

// User interface
export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<IUser> implements IUser {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public password!: string;
  public role!: Role;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
      defaultValue: Role.CONTRACTOR,
      validate: {
        notEmpty: {
          msg: 'Role is required'
        }
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['role']
      }
    ]
  }
);

// Hooks for additional validation using Zod
User.beforeCreate(async (user: User) => {
  // Validate all fields using Zod
  const validation = UserValidation.validateUserData({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: user.password,
    role: user.role
  });

  if (!validation.isValid) {
    throw new ValidationError(validation.errors.join(', '));
  }

  // Apply validated and sanitized data
  if (validation.data) {
    user.firstName = validation.data.firstName;
    user.lastName = validation.data.lastName;
    user.email = validation.data.email;
    user.phoneNumber = validation.data.phoneNumber;
    user.role = validation.data.role;
  }
});

User.beforeUpdate(async (user: User) => {
  // Check for email uniqueness if email is being changed
  if (user.changed('email')) {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser && existingUser.id !== user.id) {
      throw new ValidationError('Email already exists');
    }
  }

  // Validate changed fields using Zod
  const changedFields: any = {};
  if (user.changed('firstName')) changedFields.firstName = user.firstName;
  if (user.changed('lastName')) changedFields.lastName = user.lastName;
  if (user.changed('email')) changedFields.email = user.email;
  if (user.changed('phoneNumber')) changedFields.phoneNumber = user.phoneNumber;
  if (user.changed('password')) changedFields.password = user.password;
  if (user.changed('role')) changedFields.role = user.role;

  if (Object.keys(changedFields).length > 0) {
    const validation = UserValidation.validateUserUpdate(changedFields);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors.join(', '));
    }

    // Apply validated and sanitized data to changed fields
    if (validation.data) {
      if (validation.data.firstName) user.firstName = validation.data.firstName;
      if (validation.data.lastName) user.lastName = validation.data.lastName;
      if (validation.data.email) user.email = validation.data.email;
      if (validation.data.phoneNumber) user.phoneNumber = validation.data.phoneNumber;
      if (validation.data.role) user.role = validation.data.role;
    }
  }
});

export const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully!');
    
    // Create test users with different roles
    await User.bulkCreate([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@talentbridge.com',
        phoneNumber: '+1234567890',
        password: 'AdminPass123',
        role: Role.ADMIN
      },
      {
        firstName: 'John',
        lastName: 'Contractor',
        email: 'contractor@example.com',
        phoneNumber: '+1234567891',
        password: 'ContractorPass123',
        role: Role.CONTRACTOR
      },
      {
        firstName: 'Jane',
        lastName: 'Client',
        email: 'client@example.com',
        phoneNumber: '+1234567892',
        password: 'ClientPass123',
        role: Role.CLIENT
      },
      {
        firstName: 'Tech',
        lastName: 'Company',
        email: 'company@example.com',
        phoneNumber: '+1234567893',
        password: 'CompanyPass123',
        role: Role.COMPANY
      }
    ]);
    
    console.log('Test users created successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default User; 