const { Item, Category, User, Message, Sequelize } = require("../../models");
const { toJSON } = require("./_utils");
const Op = Sequelize.Op;

exports = module.exports = {
  find({
    search,
    category,
    limit,
    offset,
    orderBy,
    orderDirection,
    approvalStatus,
    author
  } = {}) {
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

    if (approvalStatus) {
      where.approval = approvalStatus;
    }

    if (author) {
      where.UserId = author;
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
      let direction = "ASC";

      if (orderDirection && orderDirection.toLowerCase() === "desc") {
        direction = "DESC";
      }

      order.push([orderBy, direction]);
    }

    return Item.findAndCountAll({
      where,
      limit,
      offset,
      order,
      include: [Category, User]
    })
      .then(({ count, rows }) => ({ count, rows: toJSON(rows) }))
      .catch(e => {
        console.log(e.original);
        return null;
      });
  },
  findByPk(id) {
    return Item.findByPk(id, { include: [Category, User] }).then(toJSON);
  },
  middleware(options) {
    return (req, res, next) => {
      // Merge request query params and optional params
      Object.assign(options, req.query);

      if (options.user && req.user) {
        options.author = req.user.id;
      }

      exports.find(options).then(items => {
        res.locals.items = items;
        next();
      });
    };
  },
  updateApproval() {
    return (req, res, next) => {
      Item.update(
        { approval: req.body.reviewResult },
        { where: { id: req.query.itemId } }
      ).then(result => {
        next();
      });
    };
  },
  delete(id) {
    return Message.destroy({ where: { ItemId: id } }).then(() => {
      return Item.destroy({ where: { id } });
    });
  },
  create() {
    return (req, res, next) => {
      Item.create({
        title: req.body.title,
        price: parseFloat(req.body.price),
        description: req.body.description,
        photo: "/static/photos/" + req.file.originalname,
        tag: req.body.category,
        approval: "pending",
        UserId: res.locals.user.id,
        CategoryId: parseInt(req.body.category)
      }).then(item => {
        next();
      });
    };
  }
};
