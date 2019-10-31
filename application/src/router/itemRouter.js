const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/", function(req, res) {
  const { search, category, limit, offset } = req.query;

  Item.find({ search, category, limit, offset }).then(result => {
    res.json(result);
  });
});

module.exports = router;
