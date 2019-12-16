/*
* File name: adminRouter.js
* Description: router of admin dashboard
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const auth = require("../auth");

router.get(
  "/",
  auth.restrict({ role: "admin" }),
  Item.middleware({
    approvalStatus: "pending"
  }),
  function(req, res) {
    // res.json(res.locals.items);
    res.render("admin.ejs");
  }
);

module.exports = router;
