const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('./melissa_endang/Melissa_Endang.ejs', {
        "name":info.MelissaEndang.name,
        "img":info.MelissaEndang.img
    });
})
module.exports=router;