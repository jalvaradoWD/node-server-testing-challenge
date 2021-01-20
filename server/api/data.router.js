const router = require("express").Router();
const { createData, removeData, getData } = require("./data.model");

// Each time the server restarts, a new random mock data set is made.

router.get("/", getData);

router.post("/", createData);

router.delete("/:id", removeData);

module.exports = router;
