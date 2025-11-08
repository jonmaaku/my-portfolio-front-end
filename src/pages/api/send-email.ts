import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name } = req.body;

  // Leave these empty for now; fill in your credentials in .env
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: user,
      to: email,
      subject: 'Thank you for reaching out!',
      text: `Hi ${name},\n\nThank you for contacting me. I will get back to you as soon as possible.\n\nBest regards,\nYour Name`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
