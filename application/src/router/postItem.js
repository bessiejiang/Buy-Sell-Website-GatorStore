/*
* File name: postItem.js
* Description: router of post items
* Author: Team-12
* Submission: Fall-2019
* Instructor: Dragutin Petkovic
*/
const express = require("express");
const router = express.Router();
const Item = require("../controller/item");
const auth = require("../auth");
const multer  = require('multer');
const fs = require("fs");
const upload = multer({ dest: 'src/static/photos' });

router.use(
    "/",
    auth.restrict(),
    Item.middleware({ user: true, orderBy: "createdAt" }),
    upload.single('imageFile'),
    Item.create(),
    function(req, res) {
        // const title=req.body.title;
        // const price=req.body.price;
        // const description=req.body.description;
        // const category=req.body.category;
        fs.rename(req.file.path, "src/static/photos/" + req.file.originalname, function(err) {
            if (err) {
                throw err;
            }
        })
        // const picUrl="/static/photos/" + req.file.originalname;
        // console.log("picURL: ",picUrl);
        res.redirect('/dashboard');
    }
);

module.exports = router;