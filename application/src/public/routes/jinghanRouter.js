const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/jinghan_cao/info.json",'utf8'));
    res.render('jinghan_cao/jinghan_Cao.ejs', {
        "name":info.name,
        "intro":info.intro,
        "img":info.img,
        "courses":info.courses
    });
})
module.exports=router;