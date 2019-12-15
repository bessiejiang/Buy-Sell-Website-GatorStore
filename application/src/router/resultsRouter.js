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
  let pick = mostRecent;

  switch (req.query.sortBy) {
    case "Most Recent":
      pick = mostRecent;
      break;
    case "Oldest":
      pick = oldest;
      break;
    case "Price:Low to High":
      pick = lowToHigh;
      break;
    case "Price:High to Low":
      pick = hiToLow;
      break;
    default:
      break;
  }


  console.log(typeof(pick))
  allItem.sort(pick);
  res.render("results.ejs");
});

module.exports = router;
