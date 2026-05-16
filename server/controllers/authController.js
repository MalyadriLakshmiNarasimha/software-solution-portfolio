import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signAccess = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });

const signRefresh = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = signAccess(user._id);
    const refreshToken = signRefresh(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ accessToken, user: { email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const accessToken = signAccess(req.foundUser._id);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshToken: token });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }
    res.clearCookie('refreshToken', COOKIE_OPTS);
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
