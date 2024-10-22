const { sendMailPromise } = require("../utils.js");

async function clientBeforePaymentSendEmail(data) {
  const {
    OrderID,
    TypeOfPaper,
    TaskLevel,
    SelectSubject,
    ReferencingStyle,
    NoOfSources,
    PreferredLanguage,
    PaperStandard,
    NoOfPages,
    PaperFormat,
    Deadline,
    PricePerPage,
    TotalAmount,
    Topic,
    UserName,
    UserEmail,
    Country,
    PostalCode,
    UserPhone,
    UserInfo,
    CurrencyUnit,
    access_token,
  } = data;
  const price_unit = CurrencyUnit;
  const CurrencySymbol = price_unit.split(" ")[1];
  const pricetotal = TotalAmount;

  const pricetotalWithoutCurrency = price_unit.replace(/[^a-zA-Z]/g, "");
  const finalPaymentUnit = Buffer.from(pricetotalWithoutCurrency).toString(
    "base64"
  );
  const finalTotalAmount = Buffer.from(pricetotal).toString("base64");
  const finalProductName = Buffer.from("Digital Service").toString("base64");
  const orderToken = Buffer.from(OrderID).toString("base64");

  const finalUrl = Buffer.from(
    "http://localhost:3000/send-order-form-after"
    // "https://express-vercel-six-orcin.vercel.app/send-order-form-after"
  ).toString("base64");

  const paymentLinkStripe = `https://mastermindsenterprises.com/stripe-version-2/secure-pay-external-2.php?cevpr_havg=${finalPaymentUnit}&cevpr_nzbhag=${finalTotalAmount}&cebqhpg_anzr=${finalProductName}&gbxra_rkgreany=${orderToken}&url=${finalUrl}`;
  try {
    const mailOptions = {
      from: "Gradesup® Alert - Order Received <support@gradesup.org>",
      to: data.UserEmail,
      subject:
        "We Have Received Your Order – Complete Your Payment Now | Gradesup.org",
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Email</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      "
    >
      <!-- Header -->
      <div
        style="
          background-color: #6b21a8;
          padding: 10px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        "
      >
        <img
          style="height: 60px"
          src="https://res.cloudinary.com/dya85s3yf/image/upload/v1729504385/logo-removebg-preview_y4acol.png"
          alt="Logo"
        />
      </div>

      <!-- Main Content -->
      <table
        width="100%"
        style="
          text-align: center;
          margin-bottom: 20px;
          padding-top: 30px;
          height: 200px;
        "
      >
        <tr>
          <td>
            <h2
              style="
                font-size: 28px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 8px;
              "
            >
              Thank You For Your Order!
            </h2>
            <p
              style="
                font-weight: 700;
                font-size: 16px;
                color: #4b5563;
                margin-bottom: 25px;
                text-transform: capitalize;
              "
            >
              We are currently processing your order. <br />
              Our team of experts will contact you shortly.
            </p>

            <a
              href="${paymentLinkStripe}"
              style="
                border-radius: 10px;
                background-color: #6b21a8;
                padding: 10px 20px;
                text-decoration: none;
                color: whitesmoke;
                font-size: 16px;
              "
              >Pay Now</a
            >

            <p
              style="
                font-weight: 700;
                font-size: 16px;
                color: #4b5563;
                margin-top: 30px;
                text-transform: capitalize;
              "
            >
              Please click the Pay Now button to complete your payment.<br />
              This will allow us to start the working of your order
              immediately<br />
              and keep you updated on its progress.
            </p>
          </td>
        </tr>
      </table>

      <!-- Order Summary -->
      <div style="padding-top: 20px; margin-bottom: 20px; padding: 10px 40px">
        <hr style="margin-top: 20px" />

        <h3 style="font-size: 20px; color: #1f2937">Personal Details</h3>
        <table width="100%">
          <tr>
            <td style="font-size: 14px">Name</td>
            <td style="font-weight: 600; text-align: right">
              ${UserName}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Email</td>
            <td
              style="font-weight: 600; text-align: right; text-decoration: none"
            >
            ${UserEmail}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Phone Number</td>
            <td style="font-weight: 600; text-align: right">
              ${UserPhone}
            </td>
          </tr>
           <tr>
            <td style="font-size: 14px">Phone Number</td>
            <td style="font-weight: 600; text-align: right">
              ${UserPhone}
            </td>
          </tr>
        </table>
        <hr style="margin-top: 20px" />

        <h3 style="font-size: 20px; color: #1f2937; margin-top: 20px">
          Order Details
        </h3>
        <table width="100%">
        <tr>
            <td style="font-size: 14px">OrderID</td>
            <td style="font-weight: 600; text-align: right">
              ${OrderID}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Type of Paper</td>
            <td style="font-weight: 600; text-align: right">
              ${TypeOfPaper}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Task/Academic Level</td>
            <td style="font-weight: 600; text-align: right">
              ${TaskLevel}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Subject</td>
            <td style="font-weight: 600; text-align: right">
              ${SelectSubject}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Referencing Style</td>
            <td style="font-weight: 600; text-align: right">
              ${ReferencingStyle}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Number of Sources</td>
            <td style="font-weight: 600; text-align: right">
              ${NoOfSources}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Paper Standard</td>
            <td style="font-weight: 600; text-align: right">
              ${PaperStandard}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Preferred Language Style</td>
            <td style="font-weight: 600; text-align: right">
              ${PreferredLanguage}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Paper Format</td>
            <td style="font-weight: 600; text-align: right">
              ${PaperFormat}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Deadline</td>
            <td style="font-weight: 600; text-align: right">
              ${Deadline}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Topic</td>
            <td style="font-weight: 600; text-align: right">
              ${Topic}
            </td>
          </tr>
        </table>

        <hr style="margin-top: 20px" />
        <h3 style="font-size: 20px; color: #1f2937; margin-top: 20px">
          Order Pricing
        </h3>
        <table width="100%">
          <tr>
            <td style="font-size: 14px">Price Per Page</td>
            <td style="font-weight: 600; text-align: right">
              ${PricePerPage}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Discount</td>
            <td
              style="
                font-weight: 600;
                text-align: right;
                text-transform: uppercase;
              "
            >
              50% Off
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Ai & Turnitin Report</td>
             <td
              style="
                font-weight: 600;
                background: #6b21a8;
                padding: 2px;
                border-radius: 20px;
                display: inline;
                float: right;
                width: 30%;
                text-align: center;
                font-size: 12px;
                color: white;
                text-transform: uppercase;
                font-weight: 600;
              "
            >
              Free
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px">Currency</td>
            <td
              style="
                font-weight: 600;
                text-align: right;
                text-transform: uppercase;
              "
            >
              ${CurrencyUnit}
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; font-weight: 600">Totat Price</td>
            <td style="font-weight: 600; text-align: right">
              ${TotalAmount}
            </td>
          </tr>
        </table>
        <hr style="margin-top: 20px" />
      </div>

      <!-- WhatsApp Section -->
      <div style="text-align: center; margin-bottom: 10px; padding: 20px">
        <div
          style="border: 1px dashed #cccccc; border-radius: 5px; padding: 15px"
        >
          <p style="font-size: 16px; color: #666666; margin-bottom: 15px">
            You Can Contact Our Support Team 24/7.
          </p>
          <a
            href="https://wa.me/+447451271188?text=Hi, I Need Academic Help Instantly. Could You Please Assist Me In Submitting My Assignment Before The Deadline?"
            style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #25d366;
              border: none;
              border-radius: 5px;
              text-decoration: none;
              color: white;
              font-size: 16px;
              font-weight: bold;
            "
          >
            <img
              src="https://gogrades.org/web-assets/whatsapp.png"
              alt="WhatsApp Icon"
              style="height: 30px; margin-right: 10px; vertical-align: middle"
            />
            WhatsApp Now
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          background-color: #6b21a8;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          font-size: 12px;
          margin: 0;
        "
      >
        <p>© 2024 GradesUp.org. All rights reserved</p>
      </div>
    </div>
  </body>
</html>
`,
    };

    const info = await sendMailPromise(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending before payment client  email:", error);
    throw new Error("Error sending before payment client  email");
  }
}

async function supportBeforePaymentSendEmail(data, orderFiles) {
  const {
    OrderID,
    TypeOfPaper,
    TaskLevel,
    SelectSubject,
    ReferencingStyle,
    NoOfSources,
    PreferredLanguage,
    PaperStandard,
    NoOfPages,
    PaperFormat,
    Deadline,
    PricePerPage,
    TotalAmount,
    Topic,
    UserName,
    UserEmail,
    Country,
    PostalCode,
    UserPhone,
    UserInfo,
    CurrencyUnit,
    access_token,
  } = data;
  try {
    const mailOptions = {
      from: "New Order Form | Gradesup.org <support@gradesup.org>",
      to: "support@gradesup.org",
      subject: "New Order Form | Gradesup.org",
      html: `
        <p style="font-weight: bold; font-size: 20px">Order Details</p>

        <hr />

        <b>OrderID:</b> ${OrderID} <br />
        <b>Type of Paper:</b> ${TypeOfPaper} <br />
        <b>Task/Acadamic Level:</b> ${TaskLevel} <br />
        <b>Order Subject:</b> ${SelectSubject} <br />
        <b>Referencing Style:</b> ${ReferencingStyle} <br />
        <b>Number of Sources:</b> ${NoOfSources} <br />
        <b>Paper Standard:</b> ${PaperStandard} <br />
        <b>Number of Pages:</b> ${NoOfPages} <br />


        <b>Preferred Language Style:</b> ${PreferredLanguage} <br />
        <b>Paper Format:</b> ${PaperFormat} <br />
        <b>Order Deadline:</b> ${Deadline} <br />
        <b>Order Topic:</b> ${Topic} <br />
        <br />
        
        <p style="font-weight: bold; font-size: 20px">Contact Details</p>

        <hr />

        <b>Order Candidate Name:</b> ${UserName} <br />
        <b>Order Candidate Email:</b> ${UserEmail} <br />
        <b>Order Candidate Phone Number:</b> ${UserPhone} <br />
        <b> Country : </b> ${Country} <br/>
        <br />


        <p style="font-weight: bold; font-size: 20px">Price Details</p>

        <hr />

        <b>Payment Status:</b> Not Paid <br />
        <b>Payment Amount:</b> ${TotalAmount} <br />
        <b>Price Per Page:</b> ${PricePerPage} <br />
        <b>Payment Unit:</b> ${CurrencyUnit} <br />


`,
      attachments: orderFiles.map((file) => ({
        filename: file.originalname,
        content: file.buffer,
      })),
    };
    const info = await sendMailPromise(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending before payment client  email:", error);
    throw new Error("Error sending before payment client  email");
  }
}

module.exports = {
  clientBeforePaymentSendEmail,
  supportBeforePaymentSendEmail,
};
