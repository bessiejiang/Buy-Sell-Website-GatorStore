const express = require("express");
const router = express.Router();
const Message = require("../controller/message");

router.get("/", Message.find(), function(req, res) {
  if (!req.user) {
    return res.redirect("/");
  }

  res.render("dashboard.ejs");
});

module.exports = router;
