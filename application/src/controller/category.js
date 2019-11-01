const { Category, sequelize } = require("../../models");

module.exports = {
  find() {
    return Category.findAll();
  },
  findByPk(id) {
    return Category.findByPk(id);
  }
};
