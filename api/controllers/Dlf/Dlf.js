const { SendDlfEmail, SendDlfEmailClient } = require("./SendDLfEmail.js");

async function Dlf(req, res) {
  try {
    const data = req.body;
    await SendDlfEmail(data, res);
    await SendDlfEmailClient(data, res);
    return res.status(200).json({ message: "OK", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = Dlf;
