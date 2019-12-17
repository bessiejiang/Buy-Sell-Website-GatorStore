const { Message, Item, User, Sequelize } = require("../../models");
// const User = require("../controller/user");
const { toJSON } = require("./_utils");
const Op = Sequelize.Op;

exports = module.exports = {
  find({ from, to } = {}) {
    const or = [];
    const order = [
      ["ItemId", "ASC"],
      ["createdAt", "ASC"]
    ];

    if (from) {
      or.push({ FromId: from });
    }

    if (to) {
      or.push({ ToId: to });
    }

    return Message.findAll({
      where: {
        [Op.or]: or
      },
      order: order,
      include: [Item, { model: User, as: "From" }, { model: User, as: "To" }]
    }).then(toJSON);
  },
  middleware(options) {
    return (req, res, next) => {
      // Merge request query params and optional params
      Object.assign(options, req.query);

      if (options.user && req.user) {
        options.from = req.user.id;
        options.to = req.user.id;
      }

      exports
        .find(options)
        .then(messages => {
          res.locals.messages = messages;
          next();
        })
        .catch(e => {
          console.log(e);
          next(e);
        });
    };
  },
  create() {
    return (req, res, next) => {
      Message.create({
        FromId: req.body.from,
        ToId: req.body.to,
        ItemId: req.query.item,
        message: req.body.contactDetails,
        dealLocation: req.body.contactLocation,
        dealTime: req.body.contactTime
      })
        .then(item => {
          next();
        })
        .catch(e => {
          console.log(e);
          next(e);
        });
    };
  }
};
