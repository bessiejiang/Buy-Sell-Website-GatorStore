const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('beibei_jiang/Beibei_Jiang.ejs', {
        "name":info.BeibeiJiang.name,
        "intro":info.BeibeiJiang.intro,
        "img":info.BeibeiJiang.img
    });
})
module.exports=router;