/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const cors = require("cors");

const app = express();
app.use(cors());

app.all("*", (req, res) => {
  console.log(
    req.params,
    "req params",
    "example path: localhost:8080/server/test_params",
    path.resolve(__dirname, `${req.params[0]}`)
  );
  let params = req.params[0];
  if (!params.endsWith("index.json")) {
    params = `${params}/index.json`;
  }
  res.sendFile(path.resolve(__dirname, `../${params}`));
});

app.listen(8080, (err) => {
  if (err) {
    console.log(err, "error app listen ;)");
  }
  console.log("Test Port Running at Port", 8080);
});
