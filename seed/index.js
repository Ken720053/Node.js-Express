const path = require("path");
const fs = require("fs");
//article seed
const articles = require("./article.js");
//寫入路徑檔案
const articleJsonPath = path.join(__dirname,"../data/articles/articles,json");
//先讀取檔案在寫入檔案
fs.readFile(articleJsonPath,(err,data) =>{
    if(err) console.log(err);

    const newData = JSON.stringify(articles , null , 4);

    fs.writeFile(articleJsonPath , newData , (err) =>{
        if(err) console.log(err);
    });
});

