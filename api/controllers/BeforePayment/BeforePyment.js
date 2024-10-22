const {
  clientBeforePaymentSendEmail,
  supportBeforePaymentSendEmail,
} = require("./SendEmail.js");

const BeforePayment = (req, res) => {
  try {
    const data = req.body;
    const orderFiles = req.files;
    clientBeforePaymentSendEmail(data);
    supportBeforePaymentSendEmail(data, orderFiles);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = BeforePayment;
