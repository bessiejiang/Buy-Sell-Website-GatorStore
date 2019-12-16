/*
* File name: logout.js
* Description: router of logout
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
