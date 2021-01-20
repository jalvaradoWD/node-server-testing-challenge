exports.up = function (knex) {
  return knex.schema.createTable("testData", (table) => {
    table.uuid("id").unique().notNullable();
    table.string("name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("country", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("testData");
};
