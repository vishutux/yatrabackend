import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: process.env.SMTP_PORT == "465",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_SENDER,
    to: to,
    subject: subject,
    html: html,
  };

  logger.info(`Sending mail to - ${to}`);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error sending mail`, error)
      // logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};

const testSendMail = async () => {
  try {
    await sendMail(
      "vaibhavKushwahaq345@gmail.com",
      "Test Subject",
      "<h1>Hello World</h1>"
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

testSendMail();