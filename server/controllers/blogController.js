import BlogPost from '../models/BlogPost.js';

export const getBlogPosts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 6 } = req.query;
    const filter = { status: 'published' };
    if (category && category !== 'All') filter.category = category;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];

    const total = await BlogPost.countDocuments(filter);
    const posts = await BlogPost.find(filter)
      .select('-content -__v')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getBlogPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' }).select('-__v');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const getAllBlogPostsAdmin = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().select('-content -__v').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const createBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deleteBlogPost = async (req, res, next) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
