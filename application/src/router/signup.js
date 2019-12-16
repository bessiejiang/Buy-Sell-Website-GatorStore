/*
* File name: signup.js
* Description: router of signup
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const auth = require("../auth");
const User = require("../controller/user");

router.get("/", function(req, res) {
  if (req.user) {
    return res.redirect("/");
  }

  res.render("signup.ejs", { formData: {} });
});

router.post(
  "/",
  function(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreeTerms
    } = req.body;
    const errors = [];

    if (!firstName) {
      errors.push("Missing First Name.");
    }

    if (!lastName) {
      errors.push("Missing Last Name.");
    }

    if (!email || !email.match(/^[^@\s]+@(mail.)?sfsu.edu$/)) {
      errors.push("Email must be from sfsu.edu.");
    }

    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      errors.push("Passwords must match");
    }

    if (agreeTerms !== "on") {
      errors.push("You must agree to the terms and conditions.");
    }

    if (errors.length > 0) {
      req.flash("error", errors.join(" "));
      return res.render("signup.ejs", {
        formData: req.body
      });
    }

    User.create(req.body)
      .then(() => next())
      .catch(err => {
        let message = err.parent.sqlMessage;

        if (err.parent.code === "ER_DUP_ENTRY") {
          message = "User already exists: " + req.body.email;
        }

        req.flash("error", message);
        res.render("signup.ejs", {
          formData: req.body
        });
      });
  },
  auth.authenticate()
);

module.exports = router;
