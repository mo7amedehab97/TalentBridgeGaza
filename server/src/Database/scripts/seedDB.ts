import sequelize from '../../config/database';
import { Role, User, ContractType, Talent, Recruiter } from '../models';

const seed = async () => {
  try {
    console.log('Seeding database...');
    //! wipes all data and recreates tables
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Step 2: Insert seed data
    const roles = await Role.bulkCreate([
      { name: 'admin' },
      { name: 'recruiter' },
      { name: 'talent' },
    ]);

    const contractsTypes = await ContractType.bulkCreate([
      { name: 'freelance' },
      { name: 'full_time' },
      { name: 'part_time' },
    ]);

    const users = await User.bulkCreate([
      {
        name: 'Admin Rand',
        email: 'admin@admin.com',
        phoneNumber: '123456789',
        password: 'hashedpassword',
        roleId: 1, //admin
        gender: "female"
      },
      {
        name: 'Rand Sohail Abu AlArraj',
        email: 'rand@company.com',
        phoneNumber: '0598836717',
        password: '123456',
        roleId: 2, // recruiter
        gender: "female"
      },
      {
        name: 'Mohammed Ehab Helles',
        email: 'mohammed@dev.com',
        phoneNumber: '0598836717',
        password: '123456',
        roleId: 3, // talent
        gender: "Male"
      },
    ]);
    const talents = await Talent.bulkCreate([
      {
        userId: 3,
        bio: "Talented Front end web Developer",
        location: "Gaza",
        contractTypeId: 2, //full time
        hourlyRate: 40.5,
        yearOfExperience: 3,
        profilePictureUrl: "https://profilepic.com/", //TODO: supposed to be s3 link
        cvUrl: "https://mycv.com/" //TODO: supposed to be s3 link
        }
    ]);

    const recruiters = await Recruiter.bulkCreate([
      {
        userId: 2,
        companyName: "Rand Investmints",
        companyTitle: "CEO",
        description: "Tech Company helps you make your dreams come true",
        imageUrl: "https://mycv.com/" //TODO: supposed to be s3 link
        }
    ]);

    console.log('Seeding completed! ✅');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seed();
