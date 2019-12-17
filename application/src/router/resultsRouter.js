/*
* File name: resultRouter.js
* Description: router of result router and filtering logic
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
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

function priceFilter(arr,a,b){
  return arr.filter(item=>{
    return item.price>=a && item.price<=b 
  })
}

router.get("/", Item.middleware({
  approvalStatus: "approved"
}), function(req, res) {
  const allItem=res.locals.items.rows;
  let pick = mostRecent;

  switch (req.query.sortBy) {
    case "Most Recent":
      allItem.sort(mostRecent)
      break;
    case "Oldest":
      allItem.sort(oldest)
      break;
    case "Price:Low to High":
      allItem.sort(lowToHigh)
      break;
    case "Price:High to Low":
      allItem.sort(hiToLow)
      break;
    default:
      break;
  }

  switch (req.query.filterBy) {
    case "0-50":
      res.locals.items.rows = priceFilter(allItem,0,50)
      break;
    case "51-100":
      res.locals.items.rows= priceFilter(allItem,51,100)
      break;
    case "101-150":
      res.locals.items.rows = priceFilter(allItem,101,150)
      break;
    case ">150":
      res.locals.items.rows = priceFilter(allItem,151,999999)
      break;
    default:
      break;
  }

  res.render("results.ejs");
});

module.exports = router;
