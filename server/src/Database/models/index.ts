import User from './user';
import Role from './role';
import Talent from './talent';
import Recruiter from './recruiter';
import ContractType from './contractType';

// Associations
const initModels = () => {
  // 1. User has a Role
  Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users',
  });

  User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role',
  });

  // 2. User has one Talent profile
  User.hasOne(Talent, {
    foreignKey: 'userId',
    as: 'talentProfile',
    onDelete: 'CASCADE',
  });

  Talent.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // 3. User has one Recruiter profile
  User.hasOne(Recruiter, {
    foreignKey: 'userId',
    as: 'recruiterProfile',
    onDelete: 'CASCADE',
  });

  Recruiter.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });


// Talent has one ContractType
ContractType.hasMany(Talent, {
  foreignKey: 'contractTypeId',
  as: 'talents',
});

Talent.belongsTo(ContractType, {
  foreignKey: 'contractTypeId',
  as: 'contractType',
});
};

export {
  User,
  Role,
  Talent,
  Recruiter,
  ContractType,
  initModels,
};
