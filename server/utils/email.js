import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export const sendContactEmail = async ({ name, email, company, budget, projectType, message }) => {
  await transporter.sendMail({
    from: `"Portfolio Site" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry from ${name} — ${company || 'No company'}`,
    html: `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
      <hr/>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};
