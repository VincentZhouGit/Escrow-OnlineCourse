var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next){
    console.log("deploy a contract!");
    res.status(201).json({
        "message": "deploy a contract!"
    });
})

module.exports = router;

