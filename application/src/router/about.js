/*
* File name: about.js
* Description: router of about page
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("about.ejs");
});

module.exports = router;