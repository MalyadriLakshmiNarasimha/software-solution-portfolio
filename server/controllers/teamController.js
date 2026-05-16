import TeamMember from '../models/TeamMember.js';

export const getTeam = async (req, res, next) => {
  try {
    const members = await TeamMember.find().select('-__v').sort({ order: 1 });
    res.json(members);
  } catch (err) {
    next(err);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json(member);
  } catch (err) {
    next(err);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
