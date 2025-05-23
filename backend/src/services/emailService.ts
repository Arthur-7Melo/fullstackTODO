import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { resetPasswordTemplate } from '../utils/templates/emailTemplates';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailResetPassword = async (to: string, resetString: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetString}`;
  const message = resetPasswordTemplate(resetUrl);

  await transporter.sendMail({
    from: `"todoApp" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Solicitação de alteração de senha",
    html: message
  });
};

