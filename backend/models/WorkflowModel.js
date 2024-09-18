import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  triggerId: { type: String, required: true }, // Store trigger ID as a string
  conditionIds: [{ type: String }], // Array of condition IDs as strings
  actionIds: [{ type: String }], // Array of action IDs as strings
  createdAt: { type: Date, default: Date.now },
});

export const workflowModel = mongoose.model('Workflow', workflowSchema);




