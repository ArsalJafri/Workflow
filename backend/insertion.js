//insertion.js
import mongoose from 'mongoose';
import { actionModel } from './models/ActionModel.js';
import { conditionModel } from './models/ConditionModel.js';
import { triggerModel } from './models/TriggerModel.js';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Connect to your MongoDB database
const mongoURI = process.env.MONGODB_URI; // Use environment variable

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const predefinedActions = [
  { name: 'Send Email', type: 'sendEmail', target: 'email@example.com' },
  { name: 'Post to Social Media', type: 'postToSocialMedia', target: 'twitterHandle' },
  // Add more actions as needed
];

const predefinedConditions = [
  { name: 'Email Subject Contains Keyword', type: 'value', value: 'important' },
  { name: 'File Size Exceeds Limit', type: 'value', value: '10MB' },
  // Add more conditions as needed
];

const predefinedTriggers = [
  { name: 'Email Received', event: 'emailReceived', config: { email: 'example@example.com' } },
  { name: 'File Uploaded', event: 'fileUploaded', config: { folder: '/uploads' } },
  // Add more triggers as needed
];

const insertData = async () => {
  try {
    // Clear existing data
    await actionModel.deleteMany({});
    await conditionModel.deleteMany({});
    await triggerModel.deleteMany({});

    // Insert predefined actions
    await actionModel.insertMany(predefinedActions);
    console.log('Predefined actions inserted');

    // Insert predefined conditions
    await conditionModel.insertMany(predefinedConditions);
    console.log('Predefined conditions inserted');

    // Insert predefined triggers
    await triggerModel.insertMany(predefinedTriggers);
    console.log('Predefined triggers inserted');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
};

insertData();
