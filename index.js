const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authentication = require("./router/authentication");
const task = require("./router/task");
require("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on port 5000");
});

app.use("/authentication", authentication);
app.use("/todo", task);
