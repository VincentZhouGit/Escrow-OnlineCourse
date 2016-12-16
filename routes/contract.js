var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");


router.post('/', function (req, res, next){
    console.log("deploy a contract!");
    res.status(201).json({
        "message": "deploy a contract!"
    });
})

router.get('/', function (req, res, next) {
    // Message.find()
    //     .populate('user', 'firstName')
    //     .exec(function (err, messages) {
    //         if (err) {
    //             return res.status(500).json({
    //                 title: 'An error occurred',
    //                 error: err
    //             });
    //         }
    //         res.status(200).json({
    //             message: 'Success',
    //             obj: messages
    //         });
    //     });

    fs.readFile(path.join(__dirname,'..','compiled_contracts','interface.json'), "utf8", function (err, data) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: data
        });
    });



});

module.exports = router;

