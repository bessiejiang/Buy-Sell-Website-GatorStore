const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./controller/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      User.findByEmail(email)
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          if (user.password !== password) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = {
  initialize: passport.initialize.bind(passport),
  session: passport.session.bind(passport),
  authenticate: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
};
