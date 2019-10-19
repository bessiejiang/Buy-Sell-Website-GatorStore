const { User, Item, Post } = require("../models");

module.exports = {
  /**
   * Create all the model tables based on the definitions in the model files.
   */
  up: async (queryInterface, Sequelize) => {
    // Order of these matter, be careful
    // New ones should go at the bottom

    await queryInterface.createTable(User.tableName, User.tableAttributes);
    await queryInterface.createTable(Item.tableName, Item.tableAttributes);
  },

  /**
   * Drop all the model tables.
   */
  down: async (queryInterface, Sequelize) => {
    // Order of these matter, be careful
    // This should be opposite the order above

    // Post changed to Item, so only drop and not create
    await queryInterface.dropTable(Post.tableName);

    await queryInterface.dropTable(Item.tableName);
    await queryInterface.dropTable(User.tableName);
  }
};
