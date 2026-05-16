import mongoose from 'mongoose';
import slugify from 'slugify';

const metricSchema = new mongoose.Schema(
  { label: String, value: String },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: {
      type: String,
      enum: ['Web', 'Mobile', 'AI/ML', 'Cloud', 'E-Commerce'],
      required: true,
    },
    client: { type: String, required: true },
    year: { type: Number, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    summary: { type: String, required: true },
    overview: { type: String },
    problem: { type: String },
    solution: { type: String },
    features: [{ type: String }],
    techStack: [{ type: String }],
    metrics: [metricSchema],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1, status: 1 });

export default mongoose.model('Project', projectSchema);
