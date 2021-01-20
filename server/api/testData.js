const faker = require("faker");
const { v4: uuid } = require("uuid");

class FakeData {
  constructor() {
    this.id = uuid();
    this.name = faker.name.findName();
    this.email = faker.internet.email();
    this.country = faker.address.country();
  }
}

const createFakeList = () => {
  const listOfFakeData = [];

  for (let i = 0; i < 10; i++) {
    listOfFakeData.push(new FakeData());
  }

  return listOfFakeData;
};

module.exports = { createFakeList, FakeData };
