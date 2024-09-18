import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Human-readable name for the action
  type: { type: String, required: true }, // e.g., "sendEmail", "postToSocialMedia"
  target: { type: String, required: true }, // e.g., email address, file path, social media account
  createdAt: { type: Date, default: Date.now },
});

export const actionModel = mongoose.model('Action', actionSchema);



