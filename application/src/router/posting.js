/*
* File name: posting.js
* Description: router of posting page
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
// const Message = require("../controller/message");
// const Item = require("../controller/item");
const auth = require("../auth");
router.get("/",
    auth.restrict(),
    function(req, res) {
    res.render("posting.ejs");
});

module.exports = router;