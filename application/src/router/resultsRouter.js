const express = require("express");
const router = express.Router();
const Item = require("../controller/item");

function mostRecent(a, b) {
  if (a.updatedAt > b.updatedAt) return -1;
  if (b.updatedAt > a.updatedAt) return 1;
  return 0;
}
function oldest(a,b){
  if (a.updatedAt > b.updatedAt) return 1;
  if (b.updatedAt > a.updatedAt) return -1;
  return 0;
}
function lowToHigh(a,b){
  if (a.price > b.price) return 1;
  if (b.price > a.price) return -1;
  return 0;
}
function hiToLow(a,b){
  if (a.price > b.price) return -1;
  if (b.price > a.price) return 1;
  return 0;
}

router.get("/", Item.middleware({
  approvalStatus: "approved"
}), function(req, res) {
  const allItem=res.locals.items.rows;
  allItem.sort(lowToHigh);
  res.render("results.ejs");
});

module.exports = router;
