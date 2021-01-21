const express = require("express");
const cors = require("cors");
const server = express();

const dataRouter = require("./api/data.router");

server.use(express.json());
server.use(cors());

server.use("/api/data", dataRouter);

module.exports = server;
