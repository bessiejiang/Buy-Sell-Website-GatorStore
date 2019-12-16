/*
* File name: auth.js
* Description: authentication
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
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
            return done(null, false, { message: "No user with that email." });
          }

          return argon2.verify(user.password, password).then(verified => {
            if (!verified) {
              return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
          });
        })
        .catch(err => {
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
    .then(user => {
      delete user.password;
      done(null, user);
    })
    .catch(err => done(err));
});

module.exports = {
  initialize: passport.initialize.bind(passport),
  session: passport.session.bind(passport),
  authenticate() {
    return (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (info) {
          req.flash("info", info.message);
        }

        if (err) {
          return next(err);
        }

        if (!user) {
          return res.redirect("/login");
        }

        req.logIn(user, err => {
          if (err) {
            return next(err);
          }

          let redirectTo = req.session.redirectTo || "/";
          delete req.session.redirectTo;

          return res.redirect(redirectTo);
        });
      })(req, res, next);
    };
  },
  restrict(options = {}) {
    return (req, res, next) => {
      let redirect = options.redirect || "/login";

      if (
        !req.user ||
        (options.role && !req.user.role.split(",").includes(options.role))
      ) {
        req.session.redirectTo = req.originalUrl;
        return res.redirect(redirect);
      }

      next();
    };
  }
};
