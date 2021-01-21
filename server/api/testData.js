const faker = require("faker");
const { v4: uuid } = require("uuid");

class FakeData {
  constructor(props) {
    const { id, name, email, country } = { ...props };
    this.id = id || uuid();
    this.name = name || faker.name.findName();
    this.email = email || faker.internet.email();
    this.country = country || faker.address.country();
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
