const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('jesse_smick/Jesse_Smick.ejs', {
        "name":info.JesseSmick.name,
        "intro":info.JesseSmick.intro,
        "intro2":info.JesseSmick.intro2,
        "img":info.JesseSmick.img
    });
})
module.exports=router;