/*
* File name: dashboard.js
* Description: router of dashboard
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const Message = require("../controller/message");
const Item = require("../controller/item");
const auth = require("../auth");

router.use(
  "/",
  auth.restrict(),
  Message.middleware({ user: true }),
  Item.middleware({ user: true, orderBy: "createdAt" }),
  function(req, res) {
    res.render("dashboard.ejs");
  }
);

module.exports = router;
