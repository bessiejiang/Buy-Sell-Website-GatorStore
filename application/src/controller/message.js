const { Message } = require("../../models");
const { toJSON } = require("./_utils");

module.exports = {
  find() {
    // TODO add filter once login/signup ready
    return (req, res, next) => {
      Message.findAll().then(messages => {
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
        item: req.query.title,
        message: req.body.reviewResult + " " + req.body.contactDetails,
        dealLocation: req.body.contactLocation,
        dealTime: req.body.contactTime
      }).then(item => {
        next();
      });
    };
  }
};
