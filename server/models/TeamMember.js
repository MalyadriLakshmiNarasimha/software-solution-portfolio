import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String },
    bio: { type: String },
    order: { type: Number, default: 0 },
    socials: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamMemberSchema);
