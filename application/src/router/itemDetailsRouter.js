/*
* File name: itemDetailsRouter.js
* Description: router of item details page
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const auth = require("../auth");

router.get("/:id", function(req, res, next) {
  Item.findByPk(req.params.id).then(item => {
    if (!item || item.approval !== 'approved') {
      // don't show items that are not approved
      return next();
    }

    res.render("itempage.ejs", {
      item
    });
  }).catch(next);
});

router.post("/:id/delete", auth.restrict(), (req, res, next) => {
  Item.findByPk(req.params.id)
    .then(item => {
      if (item.UserId === req.user.id) {
        return Item.delete(item.id);
      }
    })
    .then(() => res.redirect("back"))
    .catch(next);
});

module.exports = router;
