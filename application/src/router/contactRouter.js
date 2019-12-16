/*
* File name: contactRouter.js
* Description: router of message
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Message = require("../controller/message");

router.post("/",
    auth.restrict(),
    Message.create(),
    function(req, res) {
    res.redirect('back'); // refresh after saving contact message
});

module.exports = router;