import Settings from '../models/Settings.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find();
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    res.json(map);
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const updates = req.body;
    const ops = Object.entries(updates).map(([key, value]) =>
      Settings.findOneAndUpdate(
        { key },
        { value, updatedAt: new Date() },
        { upsert: true, new: true }
      )
    );
    await Promise.all(ops);
    res.json({ message: 'Settings updated' });
  } catch (err) {
    next(err);
  }
};
