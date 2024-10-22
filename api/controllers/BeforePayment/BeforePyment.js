const {
  clientBeforePaymentSendEmail,
  supportBeforePaymentSendEmail,
} = require("./SendEmail.js");
const { sql } = require("@vercel/postgres");

const BeforePayment = async (req, res) => {
  try {
    const data = req.body;
    const orderFiles = req.files;
    const insertOrderQuery = `
    INSERT INTO orders (
      OrderID, TypeOfPaper, TaskLevel, SelectSubject, ReferencingStyle,
      NoOfSources, PreferredLanguage, PaperStandard, NoOfPages, PaperFormat,
      Deadline, PricePerPage, TotalAmount, Topic, UserName, UserEmail,
      Country, PostalCode, UserPhone, UserInfo, CurrencyUnit
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21
    ) RETURNING *;
  `;

    const values = [
      data.OrderID,
      data.TypeOfPaper,
      data.TaskLevel,
      data.SelectSubject,
      data.ReferencingStyle,
      data.NoOfSources,
      data.PreferredLanguage,
      data.PaperStandard,
      data.NoOfPages,
      data.PaperFormat,
      data.Deadline,
      data.PricePerPage,
      data.TotalAmount,
      data.Topic,
      data.UserName,
      data.UserEmail,
      data.Country,
      data.PostalCode,
      data.UserPhone,
      data.UserInfo,
      data.CurrencyUnit,
    ];

    const { rows } = await sql(insertOrderQuery, values);
    const order = rows[0];
    const info = await clientBeforePaymentSendEmail(data);
    const info2 = await supportBeforePaymentSendEmail(data, orderFiles);
    console.log(info, info2);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = BeforePayment;
