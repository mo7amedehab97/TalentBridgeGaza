import Talent from '../models/Talent';
import sequelize from '../config/database';

const talents = [
  {
    user_id: 1,
    first_name: 'Ahmed',
    last_name: 'Mohammed',
    bio: 'Experienced software developer with 5 years of experience in web development. Specialized in React and Node.js.',
    location: 'Gaza City',
    availability: 'full-time',
    hourly_rate: 25,
    profile_picture_url: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    user_id: 2,
    first_name: 'Fatima',
    last_name: 'Ali',
    bio: 'UI/UX designer passionate about creating beautiful and functional interfaces. 3 years of experience in design.',
    location: 'Khan Younis',
    availability: 'part-time',
    hourly_rate: 20,
    profile_picture_url: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    user_id: 3,
    first_name: 'Mohammed',
    last_name: 'Hassan',
    bio: 'Full-stack developer with expertise in Python and Django. Strong background in database design and API development.',
    location: 'Rafah',
    availability: 'full-time',
    hourly_rate: 30,
    profile_picture_url: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    user_id: 4,
    first_name: 'Aisha',
    last_name: 'Omar',
    bio: 'Digital marketing specialist with experience in social media management and content creation.',
    location: 'Gaza City',
    availability: 'part-time',
    hourly_rate: 18,
    profile_picture_url: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    user_id: 5,
    first_name: 'Yousef',
    last_name: 'Ibrahim',
    bio: 'Mobile app developer specializing in React Native. Created several successful apps for local businesses.',
    location: 'Deir al-Balah',
    availability: 'full-time',
    hourly_rate: 28,
    profile_picture_url: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

const seedTalents = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Insert talents
    await Talent.bulkCreate(talents);
    console.log('Talents seeded successfully');
  } catch (error) {
    console.error('Error seeding talents:', error);
  } finally {
    await sequelize.close();
  }
};

seedTalents(); 