const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/", function(req, res) {
  let category = req.query.category;
  let search = req.query.search;

  Item.find({ search, category }).then(result => {
    res.json(result);
  });
});

module.exports = router;
