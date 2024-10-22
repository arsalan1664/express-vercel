const nodemailer = require("nodemailer");

// ********* Nodemailer ********//
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@gradesup.org",
    pass: "#MmeProduct@UPGrades@1109",
  },
});

function sendMailPromise(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); // Reject the promise if there's an error
      } else {
        resolve(info); // Resolve the promise with the email info
      }
    });
  });
}

module.exports = { transporter, sendMailPromise };
