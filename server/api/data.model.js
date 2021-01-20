const { FakeData } = require("./testData");
const { validate } = require("uuid");
const knex = require("../../data/db");

const getData = async (req, res) => {
  return res.json(await knex("testData").select("*"));
};

const createData = async (req, res) => {
  const createdData = new FakeData();
  await knex("testData").insert(createdData);
  return res.json({ message: "Inserted data into the database" });
};

const removeData = async (req, res) => {
  try {
    const { id } = req.params;

    const foundData = await knex("testData").where({ id }).first();

    if (!validate(id)) {
      throw res.status(400).json({
        message: "id is not a uuid or an id is not found in the database",
      });
    }

    if (!foundData) {
      throw res.status(400).json({
        message: "Data with that id does not exist",
      });
    }

    await knex("testData").where({ id }).del();

    return res.json({ message: "Item has been deleted." });
  } catch (error) {
    return error;
  }
};

module.exports = { createData, removeData, getData };
