import Project from '../models/Project.js';

export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 9 } = req.query;
    const filter = { status: 'published' };
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .select('-__v')
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ projects, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' }).select('-__v');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().select('-__v').sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
