const express = require("express");
const router = express.Router();
const Message = require("../controller/message");

router.post("/", Message.create(), function(req, res) {
    res.redirect('back'); // refresh after saving contact message
});

module.exports = router;