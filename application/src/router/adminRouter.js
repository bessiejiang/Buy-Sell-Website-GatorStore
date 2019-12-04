const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

router.get("/", Item.middleware({
    approvalStatus: "pending"
}), function(req, res) {
    // res.json(res.locals.items);
    res.render("admin.ejs");
});

module.exports = router;
