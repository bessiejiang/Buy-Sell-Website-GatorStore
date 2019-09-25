const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('jinYing_Ren/JinyingRen.ejs', {
        "name":info.JinYingRen.name,
        "intro":info.JinYingRen.intro,
        "img":info.JinYingRen.img
    });
})
module.exports=router;