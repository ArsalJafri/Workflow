import mongoose from 'mongoose';

const conditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "date", "value"
  value: { type: String, required: true }, // Use string to represent condition value
  createdAt: { type: Date, default: Date.now },
});

export const conditionModel = mongoose.model('Condition', conditionSchema);



