const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/:id", function(req, res) {
  Item.findByPk(req.params.id).then(item => {
    res.render("itempage.ejs", {
      item
    });
  });
});

module.exports = router;
