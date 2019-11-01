const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/", function(req, res) {
  const {
    search,
    category,
    limit,
    offset,
    orderBy,
    orderDirection
  } = req.query;

  Item.find({
    search,
    category,
    limit,
    offset,
    orderBy,
    orderDirection
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;
