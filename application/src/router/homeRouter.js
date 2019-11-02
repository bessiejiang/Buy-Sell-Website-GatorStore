const express = require("express");
const Category = require("../controller/category");
const Item = require("../controller/item");
const router = express.Router();

router.get("/", function(req, res) {
  Item.find({ limit: 6, orderBy: "createdAt", orderDirection: "desc" }).then(
    items => {
      res.render("homepage.ejs", {
        items
      });
    }
  );
});

module.exports = router;
