const { Post } = require("../models");

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
      Post.tableName,
      setDefaults([
        {
          name: "IKEA Sofa",
          price: 150,
          description:
            "Selling my sofa I had for 3 semesters.\nColor is light gray. Clean, no stains.",
          approval: "approved",
          UserId: 1
        },
        {
          name: "CSC 510 textbook",
          price: 70,
          description:
            "Foundations of Algorithms Using C++ Pseudocode (Third Edition).\nISBN: 0763723878. Good condition.",
          approval: "pending",
          UserId: 1
        },
        {
          name: "My book",
          price: 1,
          description: "Book for sale",
          approval: "rejected",
          UserId: 1
        }
      ]),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(Post.tableName, null, {});
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
