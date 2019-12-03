const { User } = require("../../models");

module.exports = {
  find() {
    return User.findAll().then(toJSON);
  },
  findByPk(id) {
    return User.findByPk(id).then(toJSON);
  },
  findByEmail(email) {
    return User.findOne({ where: { email } }).then(toJSON);
  },
  middleware() {
    return (req, res, next) => {
      res.locals.user = req.user;

      next();
    };
  }
};

function toJSON(item) {
  if (Array.isArray(item)) {
    return item.map(toJSON);
  }

  return item && item.get({ plain: true });
}
