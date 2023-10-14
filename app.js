const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const articles = require("./seed");
const fs = require("fs");
const app = express();

//設定樣板引擎
app.engine("handlebars" , exphbs.engine());
app.set("view engine" , "handlebars");
//parse req.body
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const logger = (req,res,next) => {
    const datetime = new Date();
    const timeStamp = datetime.toString()+"  "+req.originalUrl + "\n";
    console.log("timeStamp"+timeStamp);

    //fs簡潔寫法
    fs.writeFile(
        path.join(__dirname,"./log/log.txt"),
        timeStamp,
        {flag: "a+"},
        (err) => {
            if(err) console.log(err);
            next();
        }
    );

    // //先讀取檔案在寫入檔案
    // fs.readFile(path.join(__dirname,"./log/log.txt"),(err,data)=> {
    //     if(err) console.log(err);

    //     const newData = data?data.toString() + "\n" + timeStamp:timeStamp;
    //     //寫入txt
    //     fs.writeFile(path.join(__dirname,"./log/log.txt"), newData , (err) =>{
    //         if(err) console.log(err);
    //         next();
    //     });
    // });
};

const errorHandler = (err,req,res,next) => {
    console.log("err",err);
    console.log(err.name, ":", err.message);
    if(err)
        res.status(500).send(`<h1>there is error: ${err.message}</h1>`);
}

app.use(logger);//使用logger
app.use("/static" , express.static("public"));//提供靜態資源=>Public folder
app.use("/" , require("./routes/index.js"));
app.use(errorHandler);
app.listen(3000, () => {
    console.log("express app listen on prot 3000");
})