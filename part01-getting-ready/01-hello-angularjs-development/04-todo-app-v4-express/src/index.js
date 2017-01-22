"use strict";

const path = require("path");
const config = require("./lib/config");
const log4js = require("log4js");
const express = require("express");

// Logger configuration
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:lever"));

// Express configuration
const app = express();

app.set(`port`, config(`server:port`));

const pathToClientApplication = path.join(__dirname, config("server:static-path"));
logger.debug(`Serving static application found in ${pathToClientApplication}`);

app.use(express.static(pathToClientApplication));

app.listen(app.get(`port`), err => {
  if (err) {
    logger.error(`Could not establish HTTP server on port ${app.get("port")}`);
    throw err;
  }
  logger.info(`HTTP server started on port ${app.get("port")}`);
});

module.exports = app;
