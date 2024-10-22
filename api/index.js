require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Dlf = require("./controllers/Dlf/Dlf.js");
const BeforePayment = require("./controllers/BeforePayment/BeforePyment.js");
const AfterPayment = require("./controllers/AfterPayment/AfterPayment.js");
const { memoryStorage } = require("multer");
const multer = require("multer");
const createOrdersTable = require("./controllers/tables.js");
const app = express();

console.log(process.env.BASEURL);

// *******Middleswares*********//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const storage = memoryStorage();
const upload = multer({ storage });

// ************* Test **********//
app.get("/", async (req, res) => {
  const table = await createOrdersTable().catch(console.error);
  console.log("table created", table);
  return res.send("Express on Vercel");
});

// ************* DLF **********//
app.post("/send-email", Dlf);

// ************* Before Payment **********//
app.post("/send-order-form", upload.array("orderFiles[]"), BeforePayment);

// ************* After Payment **********//
app.get("/send-order-form-after", AfterPayment);

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
