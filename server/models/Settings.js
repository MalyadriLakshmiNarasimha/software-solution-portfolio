import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

settingsSchema.index({ key: 1 });

export default mongoose.model('Settings', settingsSchema);
