const express = require("express");
const { Dlf } = require("./controllers/Dlf");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.post("/dlf", Dlf);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
