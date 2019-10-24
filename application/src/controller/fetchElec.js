const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    let database = require("../models/db");
    let sql = "SELECT * FROM csc648.Items where CategoryId=3";
    database.select(sql).then(result => {
        result=JSON.stringify(result)
        result=JSON.parse(result);
        res.send(result);
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;

