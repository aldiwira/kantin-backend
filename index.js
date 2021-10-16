const express = require("express");
const { response } = require("./helper");
require("dotenv").config();

const app = express();
const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.json(response.set(true, 200, "Connected to backend server."));
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
