const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('jinghan_cao/jinghan_Cao.ejs', {
        "name":info.JinghanCao.name,
        "intro":info.JinghanCao.intro,
        "img":info.JinghanCao.img,
        "courses":info.JinghanCao.courses
    });
})
module.exports=router;