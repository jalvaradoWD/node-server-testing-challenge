const { FakeData } = require("./testData");
const { validate } = require("uuid");
const knex = require("../../data/db");

const getData = async (req, res) => {
  try {
    return res.json(
      await knex("testData")
        .select("*")
        .catch((error) => {
          throw res.status(400).json({ err: error });
        })
    );
  } catch (error) {
    return error;
  }
};

const createData = async (req, res) => {
  let createdData;
  if (req.body) {
    createdData = new FakeData(...req.body);
  } else {
    createdData = new FakeData();
  }
  await knex("testData")
    .insert(createdData)
    .catch((error) => {
      throw res.status(400).json({ error });
    });
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

    await knex("testData")
      .where({ id })
      .del()
      .catch((error) => {
        throw res.status(400).json({ error });
      });

    return res.json({ message: "Item has been deleted." });
  } catch (error) {
    return error;
  }
};

module.exports = { createData, removeData, getData };
