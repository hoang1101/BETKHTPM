const nodemailer = require('nodemailer');
const {
  HOST,
  PORT,
  USERNAME,
  PASSWORD,
  FROM_ADDRESS,
} = require('../config/mail.config');

module.exports.sendMail = ({ to, subject, body }) => {
  return new Promise((resolve, reject) => {
    if (!to) {
      return reject(new Error('invalid mail receiver'));
    }
    if (!subject) {
      return reject(new Error('invalid mail subject'));
    }
    if (!body) {
      return reject(new Error('invalid mail content'));
    }
    let mailHostConfig = {
      host: HOST,
      port: PORT,
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
      secure: false,
    };
    var transporter = nodemailer.createTransport(mailHostConfig);
    const mailOption = {
      from: FROM_ADDRESS,
      to: to,
      subject: subject,
      html: body,
    };
    transporter.sendMail(mailOption, (error, response) => {
      if (error) {
        // console.log("EMAIL ERR: ", error);
        reject(error);
      } else {
        // console.log("EMAIL RES: ", response);
        resolve(response);
      }
    });
    transporter.close();
  });
};
