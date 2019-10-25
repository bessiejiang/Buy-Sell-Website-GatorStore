const { Item, sequelize, Sequelize } = require("../../models");
const Op = Sequelize.Op;

module.exports = {
  find({ search, category } = {}, { limit, offset } = {}) {
    let where = {};

    if (search) {
      where[Op.or] = {
        title: {
          [Op.like]: `%${search}%`
        },
        description: {
          [Op.like]: `%${search}%`
        }
      };
    }

    if (category) {
      where.CategoryId = category;
    }

    return Item.findAndCountAll({
      where,
      limit,
      offset
    });
  },
  findByPk(id) {
    return Item.findByPk(id);
  }
};
