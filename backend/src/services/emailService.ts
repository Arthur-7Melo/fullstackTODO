import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailResetPassword = async(to: string, resetString: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetString}`;
  
  const message = `
    <h1>Password reset</h1>
    <p>Você solicitou um reset de senha</p>
    <p>Clique no link abaixo para resetar sua senha:</p>
    <a href=${resetUrl}>Redefinir Senha</a>
    <p>Se você não solicitou alteração de senha. Por favor, ignorar este email.</p>
  `;

  await transporter.sendMail({
    to,
    subject: "Solicitação de alteração de senha",
    html: message
  });
};

