import Inquiry from '../models/Inquiry.js';
import { sendContactEmail } from '../utils/email.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, company, budget, projectType, message } = req.body;
    const attachment = req.file ? `/tmp/${req.file.filename}` : undefined;

    const inquiry = await Inquiry.create({
      name, email, company, budget, projectType, message, attachment,
    });

    await sendContactEmail({ name, email, company, budget, projectType, message });

    res.status(201).json({ message: 'Inquiry submitted', id: inquiry._id });
  } catch (err) {
    next(err);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Not found' });
    res.json(inquiry);
  } catch (err) {
    next(err);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
