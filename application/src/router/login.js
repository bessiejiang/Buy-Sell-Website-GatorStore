/*
* File name: login.js
* Description: router of login
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.get("/", function(req, res) {
  if (req.user) {
    return res.redirect("/");
  }

  if (req.query.redirectTo) {
    req.session.redirectTo = req.query.redirectTo;
  }

  res.render("login.ejs");
});

router.post("/", auth.authenticate());

module.exports = router;
