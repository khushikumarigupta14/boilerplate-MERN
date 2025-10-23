import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const EXPIRES_IN = "7d";
export function generateToken(payload, expiresIn = EXPIRES_IN) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function decodeToken(token) {
  return jwt.decode(token);
}

import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};
