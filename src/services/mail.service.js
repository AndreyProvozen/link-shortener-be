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
      subject: "Account activation on" + process.env.API_URL,
      html: `
            <div>
              <h1>To activate your account, follow the link</h1>
              <a href="${link}">${link}</a>
            </div>
          `,
    });
  }
}

export default new MailService();
