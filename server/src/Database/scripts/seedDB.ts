import sequelize from '../../config/database';
import { Role, User, ContractType, Talent, Recruiter } from '../models';
import bcrypt from 'bcryptjs';

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

    // Hash passwords
    const adminPassword = await bcrypt.hash('AdminPass123', 10);
    const recruiterPassword = await bcrypt.hash('RecruiterPass123', 10);
    const talent1Password = await bcrypt.hash('TalentPass123', 10);
    const talent2Password = await bcrypt.hash('TalentPass456', 10);

    // Users
    const users = await User.bulkCreate([
      {
        name: 'Admin Rand',
        email: 'admin@admin.com',
        phoneNumber: '123456789',
        password: adminPassword,
        roleId: 1, // admin
        gender: 'female',
      },
      {
        name: 'Rand Sohail Abu AlArraj',
        email: 'rand@company.com',
        phoneNumber: '0598836717',
        password: recruiterPassword,
        roleId: 2, // recruiter
        gender: 'female',
      },
      {
        name: 'Mohammed Ehab Helles',
        email: 'mohammed@dev.com',
        phoneNumber: '0598836717',
        password: talent1Password,
        roleId: 3, // talent
        gender: 'male',
      },
      {
        name: 'Sara Al Qudra',
        email: 'sara@talent.com',
        phoneNumber: '0591234567',
        password: talent2Password,
        roleId: 3, // talent
        gender: 'female',
      },
    ]);

    // Talents (userId: 3, 4)
    const talents = await Talent.bulkCreate([
      {
        userId: 3,
        bio: 'Talented Front end web Developer',
        location: 'Gaza',
        contractTypeId: 2, // full_time
        hourlyRate: 40.5,
        yearOfExperience: 3,
        profilePictureUrl: 'https://profilepic.com/mohammed.jpg',
        cvUrl: 'https://mycv.com/mohammed.pdf',
      },
      {
        userId: 4,
        bio: 'Backend Developer with Node.js expertise',
        location: 'Rafah',
        contractTypeId: 1, // freelance
        hourlyRate: 30.0,
        yearOfExperience: 2,
        profilePictureUrl: 'https://profilepic.com/sara.jpg',
        cvUrl: 'https://mycv.com/sara.pdf',
      },
    ]);

    // Recruiters (userId: 2)
    const recruiters = await Recruiter.bulkCreate([
      {
        userId: 2,
        companyName: 'Rand Investments',
        companyTitle: 'CEO',
        description: 'Tech Company helps you make your dreams come true',
        imageUrl: 'https://company.com/rand-logo.png',
      },
    ]);

    console.log('Seeding completed! ✅');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seed();
