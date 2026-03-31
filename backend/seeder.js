import mongoose from 'mongoose';
import { config } from 'dotenv';
import Charity from './models/Charity.js';
import User from './models/User.js';
import { connectDB } from './config/db.js';

config();
connectDB();

const charities = [
  {
    name: 'Swing For Kids',
    description: 'Funding local pediatric care and medical research for children in need.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    name: 'Green Links Trust',
    description: 'Planting trees and promoting sustainable golf course management.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    name: 'Fairway Seniors',
    description: 'Supporting senior living facilities and community programs for the elderly.',
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=600&auto=format&fit=crop',
    isFeatured: true
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@golf.com',
    password: 'password123',
    role: 'admin'
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    scores: [42, 38, 40]
  }
];

const importData = async () => {
  try {
    await Charity.deleteMany();
    await User.deleteMany();

    const createdCharities = await Charity.insertMany(charities);
    
    // Assign a charity to the user
    const userCharity = createdCharities[0]._id;
    
    const usersWithCharity = users.map(user => {
      if (user.role === 'user') {
        return { ...user, charityId: userCharity };
      }
      return user;
    });

    await User.insertMany(usersWithCharity);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Charity.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
