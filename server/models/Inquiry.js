import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    budget: { type: String },
    projectType: { type: String },
    message: { type: String, required: true },
    attachment: { type: String },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
