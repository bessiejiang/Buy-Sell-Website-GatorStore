/*
* File name: itemRouter.js
* Description: router of item
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get(
  "/",
  Item.middleware({
    approvalStatus: "approved"
  }),
  function(req, res) {
    res.json(res.locals.items);
  }
);

module.exports = router;
