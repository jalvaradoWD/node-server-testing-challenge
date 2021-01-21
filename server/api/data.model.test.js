const supertest = require("supertest");
const { v4: uuid } = require("uuid");
const knex = require("../../data/db");

const { createFakeList } = require("./testData");
const server = require("../index");

describe("Checks the POST route handler.", () => {
  const createdData = createFakeList();

  test("should check to see if the createFakeList function returns a array with mock data in it.", () => {
    const expectedDataType = true;
    const acutualDataType = Array.isArray(createdData);
    expect(acutualDataType).toBe(expectedDataType);
  });

  test("should check to see if the mock data generated has the length of 10.", () => {
    const expectedMockDataLength = 10;
    const actualMockDataLength = createdData.length;
    expect(actualMockDataLength).toBe(expectedMockDataLength);
  });
});

describe("Checks the GET route handler.", () => {
  test("GET /api/data - An array should return with more than the length of 0.", async () => {
    const res = await supertest(server).get("/api/data");

    // If the array requested is greater than 0, then the expected value is true.
    const expected = true;
    const actual = res.body.length > 0;

    expect(actual).toBe(expected);
  });

  test("should be request an array", async () => {
    const res = await supertest(server).get("/api/data");
    const expectedDataType = true;
    const actualDataType = Array.isArray(res.body);
    expect(actualDataType).toBe(expectedDataType);
  });
});

describe("Check the DELETE route handler", () => {
  const testMockData = {
    id: uuid(),
    name: "Test User",
    email: "testuser@gmail.com",
    country: "United States of America",
  };
  test("DELETE /api/data/:id", async () => {
    await knex("testData").insert(testMockData);

    const expectItemExist = (await knex("testData")
      .where({
        id: testMockData.id,
      })
      .first())
      ? true
      : false;

    const actualValue = true;

    expect(actualValue).toBe(expectItemExist);

    const res = await supertest(server).delete(`/api/data/${testMockData.id}`);
    const expectedResponseText = "Item has been deleted.";
    const actualResponseText = res.body.message;

    expect(actualResponseText).toBe(expectedResponseText);
  });
});
