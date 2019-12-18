/*
* File name: reviewRouter.js
* Description: back after sending message
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Item = require("../controller/item");
const Message = require("../controller/message");

router.post("/",
    auth.restrict(),
    Item.updateApproval(),
    function(req, res) {
    res.redirect('back'); // refresh after updating item and sending message
});

module.exports = router;