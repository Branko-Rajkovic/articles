const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
  }

  makeTransport() {
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_LOGIN, // generated ethereal user
        pass: process.env.BREVO_PASSWORD, // generated ethereal password
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: 'Welcome',
    };

    await this.makeTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'welcome to the Website');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your reset token (valid 10 minutes)');
  }
};
