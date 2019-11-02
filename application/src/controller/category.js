const { Category } = require("../../models");

module.exports = {
  find() {
    return Category.findAll().then(toJSON);
  },
  findByPk(id) {
    return Category.findByPk(id).then(toJSON);
  },
  middleware(req, res, next) {
    module.exports.find().then(categories => {
      res.locals.categories = categories;
      next();
    });
  }
};

function toJSON(item) {
  if (Array.isArray(item)) {
    return item.map(toJSON);
  }

  return item.get({ plain: true });
}
