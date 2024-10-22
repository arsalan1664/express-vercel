const {
  supportAfterPaymentSendEmail,
  clientAfterPaymentSendEmail,
} = require("./sendEmail");

async function AfterPayment(req, res) {
  try {
    const { after_payment_token, xxxpayment_status, token, payment_id } =
      req.query;
    const query = `
      SELECT * FROM orders 
      WHERE Id = $1 
      LIMIT 1;
    `;
    const values = [after_payment_token];
    const { rows } = await sql(query, values);
    const data = rows[0];
    const info = await supportAfterPaymentSendEmail(data);
    const info2 = await clientAfterPaymentSendEmail(data);
    console.log(info, info2);
    if (xxxpayment_status === false) {
      return res.redirect("https://gradesup.org/order-form");
    }
    return res.redirect("https://gradesup.org/thankyou");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = AfterPayment;
