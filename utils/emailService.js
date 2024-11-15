const nodemailer = require("nodemailer");
// modules can manage email send {mailtrap.io sendgrid}
//@important mailtrap si required for this api version  
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

const sendVerificationEmail = async (email, otp) => {
  await sendEmail({
    email: email,
    subject: "Email Verification",
    message: `Your verification code is ${otp}. This code will expire in 10 minutes.`,
  });
};

module.exports = { sendEmail, sendVerificationEmail };
