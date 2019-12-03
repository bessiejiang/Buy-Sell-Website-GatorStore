const argon2 = require("argon2");
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

          return argon2.verify(user.password, password).then(verified => {
            if (!verified) {
              return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
          });
        })
        .catch(err => {
          console.error(err);
          done(null, false, { message: err.message });
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
  authenticate: passport.authenticate.bind(passport, "local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
};
