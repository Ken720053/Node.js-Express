const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const articleFilePath = path.join(__dirname , "../../data/articles/articles,json");

//文章列表
router.get("/",(req,res) =>{
    fs.readFile(articleFilePath , (err,data) => {
        if(err) console.log(err);
    
        const articles = JSON.parse(data.toString());
        return res.send({
            statusText:"ok",
            articles:articles
        });
    });
});

//單篇文章
router.get("/:id" , (req,res) => {
    const id = req.params.id;
    fs.readFile(articleFilePath , (err,data) => {
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());

        return res.send({
            statusText:"ok",
            articles:[articles[id]]
        });
    });
});

router.post("/" , (req,res) =>{
    const {title , subtitle ,content} = req.body;
    //檢查必備資訊Title
    if(!title)
        return res.send({
            statusText: "fail",
            message: "fail to post article, title is required"
        });

    fs.readFile(articleFilePath , (err, data) =>{
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());

        articles.push({
            id: articles.length,
            title: title || "",
            subtitle: subtitle || "",
            creatDate: new Date().toString(),
            content: content || "",
            url: `/articles/${articles.length}`,
            publish:true,
        });

        const newData = JSON.stringify(articles, null ,4);

        fs.writeFile(articleFilePath, newData , (err) => {
            if(err) console.log(err);

            res.send({
                statusText: "ok",
                message: "success post article"
            });
        });
    });
});

//修改文章
router.put("/:id" , (req,res) => {
    const id = req.params.id;
    const {title , subtitle ,content} = req.body;

    fs.readFile(articleFilePath , (err,data) => {
        if(err) console.log(err);
        const articles = JSON.parse(data.toString());

        articles[id] = {
            ...articles[id],
            title:title || "",
            subtitle:subtitle || "",
            updateDate: new Date().toString(),//修改日期
            content: content || ""
        };

        const newData = JSON.stringify(articles, null ,4);
        fs.writeFile(articleFilePath , newData , (err) =>{
            if(err) console.log(err);

            res.send({
                statusText:"ok",
                message: "success edit article"
            });
        });
    });
});

//刪除文章
router.delete("/:id" , (req,res) => {
    const index = req.params.id;

    return fs.readFile(articleFilePath , (err,data) => {
        if(err) console.log(err);
        const articles = JSON.parse(data.toString());

        if(parseInt(index) > -1 && parseInt(index) < articleFilePath.length){
            articles[index] = {
                ...articles[index],
                publish: false,
                delete: true,
                deleteDate: new Date().toString(),
            };

            const newData = JSON.stringify(articles , null , 4);
            return fs.writeFile(articleFilePath , newData , (err) =>{
                if(err) console.log(err);

                res.send({
                    statusText:"ok",
                    message: "success delete article"
                });
            });
        };

        return res.send({
            statusText:"fail",
            message: "fail delete article"
        });
    });
});

module.exports = router;