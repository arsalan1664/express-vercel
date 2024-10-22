const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Dlf = require("./controllers/Dlf/Dlf.js");
const BeforePayment = require("./controllers/BeforePyment.js");
const AfterPayment = require("./controllers/AfterPayment.js");
const app = express();

// *******Middleswares*********//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ************* Test **********//
app.get("/", (req, res) => res.send("Express on Vercel"));

// ************* DLF **********//
app.post("/send-email", Dlf);

// ************* Before Payment **********//
app.post("/send-order-form-after", BeforePayment);

// ************* After Payment **********//
app.get("/send-order-form-after", AfterPayment);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
