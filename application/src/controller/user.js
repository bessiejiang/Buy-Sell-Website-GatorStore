const argon2 = require("argon2");
const { User } = require("../../models");
const { toJSON } = require("./_utils");

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
  },
  create(user) {
    return argon2.hash(user.password).then(password =>
      User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: password,
        role: "user"
      })
    );
  }
};
