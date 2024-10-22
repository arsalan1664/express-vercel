const { transporter, sendMailPromise } = require("../utils.js");

async function SendDlfEmail(data, res) {
  try {
    const { name, email, phone, message } = data;
    const mailOptions = {
      from: "support@gradesup.org",
      to: "support@gradesup.org",
      subject: "DLF Form Entry | Gradesup.org",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2 style="color: #4a90e2">New DLF Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr style="border: 1px solid #4a90e2" />
          <p style="color: #888">Thank you for reaching out to us!</p>
        </div>  
        `,
    };

    // Send the email
    const info = await sendMailPromise(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending dlf server  email:", error);
    throw new Error("Error sending dlf server  email");
  }
}

async function SendDlfEmailClient(data, res) {
  try {
    const { name, email, phone, message } = data;
    const mailOptions = {
      from: "GradesUp® Alert <support@gradesup.org>",
      to: email,
      subject: `Thank You For Choosing Gogrades.org`,
      html: `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gradesup Discount</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: url(https://gogrades.org/web-assets/confetti.jpg);
      background-size: cover; /* Adjusts the image to cover the entire background */
      height: 100%;
      width: 100%;
    "
  >
    <div style="width: 100%; padding: 50px 0">
      <table
        style="
          max-width: 500px;
          margin: 0 auto;
          background-color: #f4f4f4;
          border-radius: 10px;
          border: 2px solid #0000001a; /* Fallback for box shadow */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
        "
        cellpadding="0"
        cellspacing="0"
      >
        <tr>
          <!-- Header -->
          <td
            style="
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              background-color: #6b21a8;
              padding: 20px;
              text-align: center;
            "
          >
            <img
              src="https://res.cloudinary.com/dya85s3yf/image/upload/v1729504385/logo-removebg-preview_y4acol.png"
              alt="Gradesup.org Logo"
              style="height: 50px"
            />
          </td>
        </tr>
        <tr>
          <!-- Content -->
          <td style="padding: 20px">
            <div style="text-align: center; margin-top: 20px">
              <img
                src="https://gogrades.org/web-assets/gift.png"
                alt="Discount"
                style="height: 45px"
              />
              <p style="font-size: 20px; color: #333333; margin-top: 10px">
                HURRY UP!
              </p>
            </div>

            <p
              style="
                font-size: 18px;
                color: #666666;
                text-align: center;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
              "
            >
              When Life Gives You Lemons - Make Lemonade! <br />
              When Gradesup.org Gives You A Discount - <br />
              Make An Order!
            </p>
            <p
              style="
                margin-top: 50px;
                display: block;
                font-size: 18px;
                color: #666666;
                text-align: center;
              "
            >
              Use this Discount Code To Get Started:
            </p>

            <!-- Discount Code -->
            <p
              style="
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                color: #6b21a8;
                text-decoration: underline;
              "
            >
              <a
                href="https://gradesup.org/order-form?coupan=GU-50%off
    "
              >
                <img
                  src="https://res.cloudinary.com/dya85s3yf/image/upload/v1729503961/GU-promo_trmyrs.png"
                  style="height: 150px"
                />
              </a>
            </p>
            <!-- Button -->
            <div style="text-align: center">
              <a
                href="https://gradesup.org/order-form?coupan=GU-50%off
    "
                style="
                  background-color: #6b21a8;
                  color: #ffffff;
                  padding: 15px 30px;
                  text-decoration: none;
                  border-radius: 4px;
                  font-size: 16px;
                  font-weight: bold;
                  display: inline-block;
                "
                >Order Now</a
              >
            </div>
          </td>
        </tr>
        <tr>
          <!-- Support Section -->
          <td style="padding: 20px; text-align: center">
            <div
              style="
                border: 1px dashed #cccccc; /* Light dashed border */
                border-radius: 5px; /* Slight rounding for aesthetics */
                padding: 15px; /* Inner padding */
              "
            >
              <p style="font-size: 16px; color: #666666; margin-bottom: 15px">
                You Can Contact Our Support Team 24/7.
              </p>
              <a
                href="https://wa.me/+447593709971?text=Hi, I Need Academic Help Instantly. Could You Please Assist Me In Submitting My Assignment Before The Deadline?"
                style="
                  display: inline-flex;
                  align-items: center;
                  padding: 10px 20px;
                  margin-bottom: 20px;
                  background-color: #25d366;
                  border: none;
                  border-radius: 5px;
                  text-decoration: none;
                  color: white;
                  font-size: 16px;
                  font-weight: bold;
                  cursor: pointer;
                "
              >
                <img
                  src="https://gogrades.org/web-assets/whatsapp.png"
                  alt="WhatsApp Icon"
                  style="height: 30px; margin-right: 10px"
                />
                <p style="margin: 0">WhatsApp Now</p>
              </a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td
            style="
              background-color: #6b21a8;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: whitesmoke;
            "
          >
            © 2024 Gradesup.org. All rights reserved
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`,
    };

    const info = await sendMailPromise(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending dlf client email:", error);
    throw new Error("Error sending dlf client  email");
  }
}

module.exports = { SendDlfEmail, SendDlfEmailClient };
