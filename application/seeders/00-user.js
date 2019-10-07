const { User } = require("../models");

/**
 * If you modify something here make sure to run:
 * ```
 * ./scripts/db seed
 * ```
 *
 * WARNING: That will remove all data from the database and replace it with only
 *          the data from the seeders folder!
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    // All items have an id that starts at 1 and goes up from there
    return queryInterface.bulkInsert(
      User.tableName,
      setDefaults([
        {
          email: "silvester-seller@mail.sfsu.edu",
          username: "silvester",
          password: "password"
        },
        {
          email: "bella-buyer@mail.sfsu.edu",
          username: "bella",
          password: "password"
        },
        {
          email: "ali-admin@mail.sfsu.edu",
          username: "ali",
          password: "password"
        }
      ]),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(User.tableName, null, {});
  }
};

/**
 * Set default id, createdAt, and updatedAt values.
 *
 * @param {*} items The items to set default values on
 */
function setDefaults(items) {
  const now = new Date();
  let id = 1;

  for (const item of items) {
    item.id = id++;
    item.createdAt = now;
    item.updatedAt = now;
  }

  return items;
}
