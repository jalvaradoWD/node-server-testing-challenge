const { createFakeList } = require("../../server/api/testData");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("testData")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("testData").insert([...createFakeList()]);
    });
};
