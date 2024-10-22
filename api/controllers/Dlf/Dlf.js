const { SendDlfEmail, SendDlfEmailClient } = require("./SendDLfEmail.js");

function Dlf(req, res) {
  try {
    const data = req.body;
    SendDlfEmail(data);
    SendDlfEmailClient(data);
    return res.status(200).json({ message: "OK", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = Dlf;
