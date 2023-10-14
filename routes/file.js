const express = require("express");
const router = express.Router();
const path = require("path");

//提供靜態資源=>絕對路徑
router.get("/txt" , (req, res) =>{
    const absPath = path.join(__dirname , "/file/test.txt")
    res.sendFile(absPath, (err) =>{
        console.log(err)
    })
});

module.exports = router;