const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/", Item.middleware({
  approvalStatus: "approved"
}), function(req, res) {
  res.render("results.ejs", {
    query: req.query
  });
});

module.exports = router;
