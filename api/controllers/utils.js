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

module.exports = { transporter };
