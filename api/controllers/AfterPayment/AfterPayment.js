const { sql } = require("@vercel/postgres");
const {
  supportAfterPaymentSendEmail,
  clientAfterPaymentSendEmail,
} = require("./sendEmail");

async function AfterPayment(req, res) {
  try {
    const { after_payment_token, xxxpayment_status, token, payment_id } =
      req.query;

    const { rows } = await sql`
      SELECT * FROM orders 
      WHERE "OrderID" = ${after_payment_token} 
      LIMIT 1;
    `;
    console.log("data", rows, after_payment_token);
    const data = rows[0];
    const info = await supportAfterPaymentSendEmail(data);
    const info2 = await clientAfterPaymentSendEmail(data);
    console.log(info, info2);
    if (xxxpayment_status === false) {
      return res.redirect(`${process.env.FRONTEND_URL}/order-form`);
    }
    return res.redirect(`${process.env.FRONTEND_URL}/thankyou`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = AfterPayment;
