import mongoose from 'mongoose';

const triggerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  event: { type: String, required: true }, // e.g., "emailReceived", "fileUploaded"
  config: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Flexible configuration options
  },
  createdAt: { type: Date, default: Date.now },
});

export const triggerModel = mongoose.model('Trigger', triggerSchema);




