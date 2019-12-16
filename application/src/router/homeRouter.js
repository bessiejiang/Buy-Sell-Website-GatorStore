/*
* File name: about.js
* Description: router of homepage
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const Item = require("../controller/item");
const router = express.Router();

router.get(
  "/",
  Item.middleware({
    limit: 6,
    orderBy: "createdAt",
    orderDirection: "desc",
    approvalStatus: "approved"
  }),
  function(req, res) {
    res.render("homepage.ejs");
  }
);

module.exports = router;
