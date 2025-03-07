import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Link Shortener Account activation on",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dde1e7; border-radius: 8px; background: #fff;">
          <div style="text-align: center; margin-bottom: 20px;">  
            <div style="display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: #000; color: #fff; font-size: 44px; font-weight: bold; text-transform: uppercase; line-height: 80px; text-align: center;">
              LS
            </div>
          </div>
          <h1 style="color: #2e2e2e; text-align: center;">Verify Your Email Address</h1>
          <p style="color: #2e2e2e;">You have chosen this email address for your Link Shortener account. To verify your email, please click the button below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #FA3DE2; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p style="color: #A43F99;">This link will expire in 1 hour after it was sent.</p>
          <hr style="border: none; border-top: 1px solid #dde1e7;">
          <p style="color: #2e2e2e; font-size: 14px;">You received this email because you recently created a new Link Shortener account. If you did not make this request, please ignore this email.</p>
        </div>
      `,
    });
  }
}

export default new MailService();
