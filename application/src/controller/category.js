const { Category } = require("../../models");
const { toJSON } = require("./_utils");

console.log(toJSON);

exports = module.exports = {
  find() {
    return Category.findAll().then(toJSON).catch(err => console.log(err));
  },
  findByPk(id) {
    return Category.findByPk(id).then(toJSON);
  },
  middleware() {
    return (req, res, next) => {
      exports.find().then(categories => {
        res.locals.categories = categories;
        next();
      });
    };
  }
};
