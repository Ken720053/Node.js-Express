const express = require("express");
const router = express.Router();
const articles = require("../seed");

const validdateUser = (user) => {
    return true;
};

const authenticator = (req,res,next) => {
    //驗證使用者身分
    if(validdateUser(req.user)) {
        next();
    }else{
        res.redirect("/");
    };
};


router.get("/", (req,res) => {
    res.render("home");
});

router.get("/about" , (req,res) => {
    res.render("about");
});

router.use("/articles",authenticator ,require("./article"));
router.use("/auth",require("./auth"));
router.use("/txt",require("./file"));
router.use("/api" , require("./api"));
router.get("/*" , (req,res) => {
    res.send({
        status: 404,
        text:"Not Found"
    })
});

module.exports = router;