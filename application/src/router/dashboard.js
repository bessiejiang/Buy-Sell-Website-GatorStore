const express = require("express");
const router = express.Router();
const Message = require("../controller/message");
const Item = require("../controller/item");
const auth = require("../auth");

router.get(
  "/",
  auth.restrict(),
  Message.find(),
  Item.middleware({ user: true, orderBy: "createdAt" }),
  function(req, res) {
    res.render("dashboard.ejs");
  }
);

module.exports = router;
