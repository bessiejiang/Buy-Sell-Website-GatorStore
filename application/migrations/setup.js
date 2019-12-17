const { Category, Message, User, Item } = require("../models");

module.exports = {
  /**
   * Create all the model tables based on the definitions in the model files.
   */
  up: async (queryInterface, Sequelize) => {
    // Order of these matter, be careful
    // New ones should go at the bottom

    await queryInterface.createTable(
      Category.tableName,
      Category.tableAttributes
    );
    await queryInterface.createTable(User.tableName, User.tableAttributes);
    await queryInterface.createTable(Item.tableName, Item.tableAttributes);
    await queryInterface.createTable(Message.tableName, Message.tableAttributes);
  },

  /**
   * Drop all the model tables.
   */
  down: async (queryInterface, Sequelize) => {
    // Order of these matter, be careful
    // This should be opposite the order above

    await queryInterface.dropTable(Message.tableName);
    await queryInterface.dropTable(Item.tableName);
    await queryInterface.dropTable(User.tableName);
    await queryInterface.dropTable(Category.tableName);
  }
};
