const {
  clientBeforePaymentSendEmail,
  supportBeforePaymentSendEmail,
} = require("./SendEmail.js");
const { sql } = require("@vercel/postgres");

const BeforePayment = async (req, res) => {
  try {
    const data = req.body;
    const orderFiles = req.files;
    const { rows } = await sql`
      INSERT INTO orders (
        "OrderID", "TypeOfPaper", "TaskLevel", "SelectSubject", "ReferencingStyle",
        "NoOfSources", "PreferredLanguage", "PaperStandard", "NoOfPages", "PaperFormat",
        "Deadline", "PricePerPage", "TotalAmount", "Topic", "UserName", "UserEmail",
        "Country", "PostalCode", "UserPhone", "UserInfo", "CurrencyUnit"
      ) VALUES (
        ${data.OrderID}, ${data.TypeOfPaper}, ${data.TaskLevel}, ${data.SelectSubject}, ${data.ReferencingStyle},
        ${data.NoOfSources}, ${data.PreferredLanguage}, ${data.PaperStandard}, ${data.NoOfPages}, ${data.PaperFormat},
        ${data.Deadline}, ${data.PricePerPage}, ${data.TotalAmount}, ${data.Topic}, ${data.UserName}, ${data.UserEmail},
        ${data.Country}, ${data.PostalCode}, ${data.UserPhone}, ${data.UserInfo}, ${data.CurrencyUnit}
      ) RETURNING *;
    `;
    const order = rows[0];
    const info = await clientBeforePaymentSendEmail(data);
    const info2 = await supportBeforePaymentSendEmail(data, orderFiles);
    console.log(info, info2);
    return res.status(200).json({ data: { orderID: order.Id } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = BeforePayment;
