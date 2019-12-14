const { Message, Sequelize } = require("../../models");
const { toJSON } = require("./_utils");
const Op = Sequelize.Op;

exports = module.exports = {
  find({from, to} = {}) {
    const or = [];

    if (from) {
      or.push({from: from});
    }

    if (to) {
      or.push({to: to});
    }

    return Message.findAll({
      where: {
        [Op.or]: or
      }
    }).then(messages => {
      return messages;
    });
  },
  middleware(options) {
    return (req, res, next) => {
      // Merge request query params and optional params
      Object.assign(options, req.query);

      if (options.user && req.user) {
        // TODO use id instead of name
        options.from = req.user.firstName;
        options.to = req.user.firstName
      }

      exports.find(options).then(messages => {
        res.locals.messages = toJSON(messages);
        next();
      });
    };
  },
  create() {
    return (req, res, next) => {
      Message.create({
        from: req.body.from,
        to: req.body.to,
        item: req.query.item, // record item name
        message: req.body.reviewResult + " " + req.body.contactDetails,
        dealLocation: req.body.contactLocation,
        dealTime: req.body.contactTime
      }).then(item => {
        next();
      });
    };
  }
};
