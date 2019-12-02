const express = require("express");
const router = express.Router();
const Message = require("../controller/message");

router.get("/", Message.find(), function(req, res) {
    res.render("dashboard.ejs");
});

module.exports = router;