const express = require("express");
const router = express.Router();
// const articles = require("../seed");
const fs = require("fs");
const path = require("path");

const articlesFilePath = path.join(__dirname,"../data/articles/articles,json");
//所有文章
router.get("/" , (req,res) => {
    fs.readFile(articlesFilePath, (err,data) => {
        if(err) console.log(err)
        const articles = JSON.parse(data.toString());
        
        res.render("articles" , {articles: articles});
    });
    
});
//單篇文章
router.get("/:id" , (req,res) =>{
    const id= req.params.id;
    fs.readFile(articlesFilePath , (err,data) => {
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());
        res.render("article" , { 
            articles: [articles[id]],
            backUrl:"/articles", //回到上一頁
            editUrl:`/articles/${id}/edit`, //編輯文章頁面
            deleteMethod: "delete",//刪除文章的 Method
            deleteUrl:`/articles/${id}`,//刪除文章的URL
            // js:["article.js"]//載入article.js
        });
    })
    
});

module.exports = router;