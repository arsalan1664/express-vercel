const { SendDlfEmail, SendDlfEmailClient } = require("./SendDLfEmail.js");

async function Dlf(req, res) {
  try {
    const data = req.body;

    console.log("data", data);

    const info = await SendDlfEmail(data);
    const info2 = await SendDlfEmailClient(data);
    console.log(info, info2);
    return res.status(200).json({ message: "OK", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = Dlf;
