const { Item, Sequelize } = require("../../models");
const Op = Sequelize.Op;

module.exports = {
  find({ search, category, limit, offset } = {}) {
    const where = {};

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

    limit = parseInt(limit);
    offset = parseInt(offset);

    if (limit < 0 || isNaN(limit) || !isFinite(limit)) {
      limit = undefined;
    }

    if (offset < 0 || isNaN(offset) || !isFinite(offset)) {
      offset = undefined;
    }

    return Item.findAndCountAll({
      where,
      limit,
      offset
    }).catch(e => {
      console.log(e.original);
      return {
        count: 0,
        rows: []
      };
    });
  },
  findByPk(id) {
    return Item.findByPk(id);
  }
};
