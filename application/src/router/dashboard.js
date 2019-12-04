const express = require("express");
const router = express.Router();
const Message = require("../controller/message");
const auth = require("../auth");

router.get("/", auth.restrict(), Message.find(), function(req, res) {
  if (!req.user) {
    return res.redirect("/");
  }

  res.render("dashboard.ejs");
});

module.exports = router;
