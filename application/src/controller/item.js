const { Item, Sequelize } = require("../../models");
const Op = Sequelize.Op;

module.exports = {
  find({ search, category, limit, offset, orderBy, orderDirection } = {}) {
    const where = {};
    const order = [];

    if (search) {
      search = search.slice(0, 40).replace(/[^0-9A-Za-z ]/g, "");

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

    if (orderBy && orderBy in Item.tableAttributes) {
      order.push([orderBy]);

      if (orderDirection && orderDirection.toLowerCase() === "desc") {
        order[0].push("DESC");
      } else {
        order[0].push("ASC");
      }
    }

    return Item.findAndCountAll({
      where,
      limit,
      offset,
      order
    }).catch(e => {
      console.log(e.original);
      return null;
    });
  },
  findByPk(id) {
    return Item.findByPk(id);
  }
};
