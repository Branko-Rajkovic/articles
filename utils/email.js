const nodemailer = require('nodemailer');
//create transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //defaine email options
  const mailOptions = {
    from: 'Branko <home.branko@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
