const express=require('express');
const router=express.Router();
const path = require("path");
const fs = require('fs');

let PATH=path.resolve();
router.get('/', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/src/public/info.json",'utf8'));
    res.render('angelo_solitario/angelosolitario.ejs', {
        "name":info.AngeloSolitario.name,
        "intro":info.AngeloSolitario.intro,
        "img":info.AngeloSolitario.img
    });
})
module.exports=router;