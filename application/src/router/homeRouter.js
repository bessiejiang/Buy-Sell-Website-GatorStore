const express = require("express");
const Category = require("../controller/category");
const Item = require("../controller/item");
const router = express.Router();

router.get("/", function(req, res) {
  Promise.all([
    Category.find(),
    Item.find({ limit: 6, orderBy: "createdAt", orderDirection: "desc" })
  ]).then(([categories, items]) => {
    res.render("homepage.ejs", {
      categories,
      items
    });
  });
});

module.exports = router;
