const express = require("express");
const Category = require("../controller/category");
const Item = require("../controller/item");
const router = express.Router();

router.get("/", function(req, res) {
  Category.find().then(categories => {
    console.log(categories.length);
    res.render("home.ejs", {
      categories
    });
  });
});

module.exports = router;
