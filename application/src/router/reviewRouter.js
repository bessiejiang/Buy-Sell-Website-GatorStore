const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const Message = require("../controller/message");

// TODO pass admin and seller user name to message once login/signup is implemented
// TODO change item id to item name to save in message
router.post("/", Item.updateApproval(), Message.create(), function(req, res) {
    res.redirect('back'); // refresh after updating item and sending message
});

module.exports = router;