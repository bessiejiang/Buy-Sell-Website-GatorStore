const { User } = require("../models");

/**
 * If you modify something here make sure to run:
 * ```
 * ./scripts/db reset
 * ```
 *
 * WARNING: That will remove all data from the database and replace it with only
 *          the data from the seeders folder!
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    // All items have an id that starts at 1 and goes up from there

    // All passwords are "password"
    return queryInterface.bulkInsert(
      User.tableName,
      setDefaults([
        {
          firstName: "Silvester",
          lastName: "Sam",
          email: "silvester-seller@mail.sfsu.edu",
          password:
            "$argon2i$v=19$m=4096,t=3,p=1$rzvYerT4f3A6qReTzgeBOg$bhNvyHf/DS0zGpgdvbI51ZOobFiN5Dmx39LMbPQxtEs",
          role: "user"
        },
        {
          firstName: "Bella",
          lastName: "Bob",
          email: "bella-buyer@mail.sfsu.edu",
          password:
            "$argon2i$v=19$m=4096,t=3,p=1$o/3tRPVgd4tc3OiSMg71VA$2GhX1git5N4wa9br54ZZcYz/6peniymbxg+fhnAjNaE",
          role: "user"
        },
        {
          firstName: "Ali",
          lastName: "Admin",
          email: "ali-admin@mail.sfsu.edu",
          password:
            "$argon2i$v=19$m=4096,t=3,p=1$atTZ9NzZXLivVX79h9sjgw$+FG/9KVJUciPRTuZmE6kZr8dhYGajmP4oR2lx8FXKWs",
          role: "user,admin"
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
