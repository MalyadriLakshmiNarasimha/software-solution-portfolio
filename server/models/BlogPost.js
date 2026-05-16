import mongoose from 'mongoose';
import slugify from 'slugify';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
      role: { type: String },
    },
    readTime: { type: Number, default: 5 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

blogPostSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified('content')) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(words / 200));
  }
  next();
});

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1, status: 1 });

export default mongoose.model('BlogPost', blogPostSchema);
